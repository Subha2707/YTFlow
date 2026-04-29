const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Helper: extract video ID or channel handle/ID from URL
function extractId(url) {
  const videoPatterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/|v\/))([^&\n?#]+)/,
    /youtube\.com\/live\/([^&\n?#]+)/,
  ];
  for (const pattern of videoPatterns) {
    const match = url.match(pattern);
    if (match) return { type: 'video', id: match[1] };
  }
  const channelPatterns = [
    /youtube\.com\/@([^/\n?#]+)/,
    /youtube\.com\/channel\/(UC[\w-]+)/,
    /youtube\.com\/c\/([^/\n?#]+)/,
  ];
  for (const pattern of channelPatterns) {
    const match = url.match(pattern);
    if (match) {
      if (url.includes('/channel/')) return { type: 'channelId', id: match[1] };
      return { type: 'channelHandle', id: match[1] };
    }
  }
  return null;
}

async function getChannelIdByHandle(handle) {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: { part: 'id', forHandle: handle, key: YOUTUBE_API_KEY },
  });
  return response.data.items?.[0]?.id || null;
}

// Get channel stats + country info
async function getChannelStats(channelId) {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: { part: 'statistics,snippet,contentDetails', id: channelId, key: YOUTUBE_API_KEY },
  });
  return response.data.items?.[0] || null;
}

// Get recent videos from channel
async function getRecentVideos(channelId, maxResults = 5) {
  const channelResp = await axios.get(`${BASE_URL}/channels`, {
    params: { part: 'contentDetails', id: channelId, key: YOUTUBE_API_KEY },
  });
  const uploadsId = channelResp.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) return [];

  const videosResp = await axios.get(`${BASE_URL}/playlistItems`, {
    params: { part: 'snippet', playlistId: uploadsId, maxResults, key: YOUTUBE_API_KEY },
  });
  const videoIds = videosResp.data.items.map(item => item.snippet.resourceId.videoId).join(',');
  const statsResp = await axios.get(`${BASE_URL}/videos`, {
    params: { part: 'statistics,snippet,contentDetails', id: videoIds, key: YOUTUBE_API_KEY },
  });
  return statsResp.data.items || [];
}

router.post('/', auth, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const extracted = extractId(url);
  if (!extracted) return res.status(400).json({ error: 'Invalid YouTube URL' });

  try {
    if (extracted.type === 'video') {
      const videoResp = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'statistics,snippet,contentDetails',
          id: extracted.id,
          key: YOUTUBE_API_KEY,
        },
      });
      const video = videoResp.data.items?.[0];
      if (!video) return res.status(404).json({ error: 'Video not found' });

      const stats = video.statistics;
      const snippet = video.snippet;
      const content = video.contentDetails;

      const views = parseInt(stats.viewCount || 0);
      const likes = parseInt(stats.likeCount || 0);
      const comments = parseInt(stats.commentCount || 0);
      const engagement = views > 0 ? (((likes + comments) / views) * 100).toFixed(2) : '0';

      // Get publisher's subscriber count
      let subscriberCount = 0;
      try {
        const channelData = await getChannelStats(snippet.channelId);
        subscriberCount = parseInt(channelData?.statistics?.subscriberCount || 0);
      } catch (e) {}

      const durationISO = content.duration; // PT1H2M10S
      const durationSeconds = parseDuration(durationISO);

      const data = {
        type: 'video',
        videoId: extracted.id,
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        channelTitle: snippet.channelTitle,
        channelSubs: subscriberCount,
        publishedAt: snippet.publishedAt,
        duration: durationISO,
        durationSeconds,
        views,
        likes,
        comments,
        engagement: parseFloat(engagement),
        tags: snippet.tags || [],
        categoryId: snippet.categoryId,
      };
      return res.json(data);
    } 
    else if (extracted.type === 'channelId' || extracted.type === 'channelHandle') {
      let channelId = extracted.type === 'channelId' ? extracted.id : await getChannelIdByHandle(extracted.id);
      if (!channelId) return res.status(404).json({ error: 'Channel not found' });

      const channel = await getChannelStats(channelId);
      const videos = await getRecentVideos(channelId, 5);

      const channelStats = channel?.statistics || {};
      const subs = parseInt(channelStats.subscriberCount || 0);
      const totalViews = parseInt(channelStats.viewCount || 0);
      const videoCount = parseInt(channelStats.videoCount || 0);
      const snippet = channel?.snippet;

      const videoList = videos.map(v => ({
        title: v.snippet.title,
        videoId: v.id,
        views: parseInt(v.statistics.viewCount || 0),
        likes: parseInt(v.statistics.likeCount || 0),
        comments: parseInt(v.statistics.commentCount || 0),
        publishedAt: v.snippet.publishedAt,
        thumbnail: v.snippet.thumbnails.default.url,
        duration: v.contentDetails.duration,
      }));

      // Average views of recent videos
      const avgViews = videoList.length > 0 
        ? Math.round(videoList.reduce((sum, v) => sum + v.views, 0) / videoList.length)
        : 0;

      const data = {
        type: 'channel',
        channelId,
        channelTitle: snippet?.title || '',
        customUrl: snippet?.customUrl || '',
        subscribers: subs,
        totalViews,
        videoCount,
        avgRecentViews: avgViews,
        recentVideos: videoList,
      };
      return res.json(data);
    }
  } catch (err) {
    console.error('YouTube API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
});

// Helper to parse ISO 8601 duration to seconds
function parseDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

module.exports = router;