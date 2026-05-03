import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../components/Card';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiTag, FiShare2, FiBookmark } from 'react-icons/fi';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Article database (same as Blog.jsx but with full content)
  const articles = {
    'ai-tools-youtube-creators-2025': {
      title: '5 AI Tools Every YouTube Creator Should Use in 2025',
      author: 'YTFlow Team',
      date: 'May 15, 2025',
      readTime: '6 min read',
      category: 'AI',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      content: [
        "Artificial intelligence is no longer optional for content creators — it's a superpower. In 2025, the landscape of AI tools has matured dramatically, and creators who leverage them are seeing 2–3x faster growth.",
        "The key isn't just using AI — it's knowing which tools solve which problems. After testing dozens of platforms, here are the five that every serious YouTube creator should have in their toolkit.",
        "1. YTFlow – AI Content Planner — Generate video ideas, SEO titles, tags, and full descriptions from a single topic. The 7-day calendar mode plans your entire week in seconds, eliminating brainstorming burnout forever.",
        "2. Descript – AI Video Editing — Edit videos by editing text. Remove filler words, add captions, and polish your content without touching a traditional timeline. Perfect for talking-head and tutorial creators.",
        "3. TubeBuddy – AI SEO Suite — Keyword research, tag suggestions, and A/B thumbnail testing powered by machine learning. Their new AI features analyze your video before upload and suggest improvements.",
        "4. Groq / ChatGPT – AI Scriptwriting — Brainstorm hooks, write intros, and generate B-roll ideas conversationally. Groq's ultra-fast inference means you get creative suggestions in under a second.",
        "5. Canva AI – Thumbnail Design — AI-powered background removal, magic resize, and design suggestions for click-worthy thumbnails. The new AI design generator creates three thumbnail variations from a single description.",
        "The creators who win in 2025 won't be the ones who work hardest — they'll be the ones who work smartest. Start incorporating these tools into your workflow today, and you'll wonder how you ever managed without them.",
      ],
    },
    'rank-videos-higher-seo-tags': {
      title: 'How to Rank Your Videos Higher with SEO Tags',
      author: 'YTFlow Team',
      date: 'May 10, 2025',
      readTime: '8 min read',
      category: 'SEO',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      content: [
        "YouTube SEO isn't just about stuffing keywords — it's about understanding search intent and matching it with the right tags. Done correctly, good tags can be the difference between 50 views and 5,000.",
        "Step 1: Research with YouTube Search Suggestions — Start typing your topic in YouTube's search bar. The autocomplete suggestions are pure gold — they represent real searches from millions of real users. Write down the top 10 suggestions.",
        "Step 2: Use Long-Tail Tags — Instead of just 'cooking,' use 'easy Indian cooking for beginners' or 'healthy dinner recipes under 30 minutes.' Long-tail tags face significantly less competition and convert viewers at a much higher rate.",
        "Step 3: Mix Broad and Specific Tags — A balanced tag mix includes: 1–2 broad tags (e.g., 'technology'), 4–5 specific tags (e.g., 'React JS tutorial 2025'), and 3–4 long-tail tags (e.g., 'how to learn React for beginners step by step').",
        "Step 4: Analyze Competitor Tags — Use tools like TubeBuddy or vidIQ to see exactly what tags successful competitors are using. Don't copy them blindly — study them, understand the pattern, and create an improved version.",
        "Step 5: Update Old Videos — Go back to your underperforming videos and refresh their tags. YouTube's algorithm actively re-evaluates content when metadata changes. Many creators see a 30–50% views boost from this simple habit.",
        "Tags alone won't make a video go viral, but they dramatically increase discoverability when combined with a strong title and compelling description. Make tag optimization a non-negotiable part of your upload checklist.",
      ],
    },
    'content-calendar-consistent-growth': {
      title: 'The Power of a Content Calendar for Consistent Growth',
      author: 'YTFlow Team',
      date: 'May 5, 2025',
      readTime: '5 min read',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200',
      content: [
        "Consistency is the single biggest predictor of YouTube success. Channels that upload weekly grow 2.5x faster than those that post sporadically. But raw consistency without planning leads to burnout and repetitive content.",
        "A 7-day content calendar solves this elegantly by: removing daily decision fatigue (you always know exactly what to film), ensuring topic variety (no more accidentally repeating the same format three weeks in a row), allowing efficient batch filming (record multiple videos in one session), and making SEO intentional (each video targets a specific keyword from day one).",
        "YTFlow's calendar mode auto-generates a unique video topic for each day, complete with SEO-optimized titles, format suggestions (tutorial, vlog, challenge, etc.), 5 relevant tags per video, and thumbnail concepts to guide your designer.",
        "The best creators aren't just creative — they're deeply organized. A content calendar bridges the gap between chaotic inspiration and sustainable growth. Seven days of planning saves seven hours of guessing.",
        "Start your first calendar today: pick a niche, open YTFlow's Planner, toggle to Calendar Mode, and let AI build your week. You'll be surprised how much clarity a single page of planning can bring.",
      ],
    },
    'youtube-analytics-beyond-views': {
      title: 'Understanding YouTube Analytics: Beyond Views and Likes',
      author: 'YTFlow Team',
      date: 'April 28, 2025',
      readTime: '10 min read',
      category: 'Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      content: [
        "Views and likes are surface-level metrics. The numbers that actually drive sustainable channel growth are deeper, and most creators ignore them entirely.",
        "1. Click-Through Rate (CTR) — If your CTR is below 4%, your thumbnails and titles desperately need work. Above 8% is considered excellent. CTR measures how often people click after seeing your video in search or suggested.",
        "2. Average View Duration (AVD) — AVD tells you how long people watch before clicking away. Your goal should be above 50% of your total video length. If it's lower, your intro or pacing needs adjustment.",
        "3. Audience Retention Curve — The first 15 seconds matter more than anything else. If you lose more than 30% of viewers in the intro, you need a drastically stronger hook in the opening moments.",
        "4. Impressions Click-Through Rate — This metric shows how aggressively YouTube is promoting your video. High impressions paired with low CTR means your packaging is weak — great visibility, poor conversion.",
        "5. Traffic Sources — Are viewers finding you through YouTube search, suggested videos, external websites, or browse features? Double down on whichever source is performing best and optimize your content for that channel.",
        "Remember: data without action is just trivia. Every single metric should lead to one specific, concrete improvement in your very next video. That's how winners grow.",
      ],
    },
    'zero-to-10k-subscribers-blueprint': {
      title: 'From Zero to 10K Subscribers: A Content Strategy Blueprint',
      author: 'YTFlow Team',
      date: 'April 20, 2025',
      readTime: '12 min read',
      category: 'Growth',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200',
      content: [
        "Growing from 0 to 10,000 subscribers follows a remarkably predictable pattern. After analyzing hundreds of channels that crossed this milestone, the same three phases emerge every single time.",
        "Phase 1 (0–1K): Validation — Post 10 videos as fast as humanly possible. Don't obsess over perfect quality — test wildly different formats, styles, and topics to see what resonates. Your first 'viral-adjacent' video will reveal the niche you should double down on.",
        "Phase 2 (1K–5K): Consistency + SEO — Commit to weekly uploads without exception. Use YTFlow to generate SEO-optimized titles, tags, and descriptions for every single video. Reply to every comment within the first hour. The algorithm rewards consistency and engagement.",
        "Phase 3 (5K–10K): Series & Community — Launch a recurring series that viewers can anticipate. Viewers subscribe for content they know is coming. Host occasional live streams. Create a community tab post after each upload to deepen audience connection.",
        "Common mistakes to avoid at all costs: changing niches too frequently (the algorithm gets confused), ignoring comments and community engagement (the algorithm notices), and not analyzing what actually worked in your successful videos (you'll repeat failures).",
        "Every big creator you admire started at absolute zero. The only real difference between them and everyone else? They simply kept going when growth was painfully slow and most people would have quit. Persistence is the ultimate growth hack.",
      ],
    },
    'human-ai-collaboration': {
      title: 'Why Human + AI Collaboration Beats AI Alone',
      author: 'YTFlow Team',
      date: 'April 12, 2025',
      readTime: '7 min read',
      category: 'AI',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
      content: [
        "AI can generate 100 video ideas in seconds, write descriptions in milliseconds, and research tags faster than any human team. But the best creators don't use AI to replace their creativity — they use it to amplify and accelerate it.",
        "What AI does brilliantly: brainstorming massive quantities of ideas quickly without creative fatigue, researching tags and SEO keywords with mathematical precision, generating multiple title variations for A/B testing, and creating structured content calendars that prevent scheduling chaos.",
        "What humans still do better than any AI: adding personal stories and raw authenticity that resonates emotionally, understanding cultural nuance, humor, and context that algorithms miss entirely, making ethical and brand-safe decisions with judgment and values, and connecting with audiences on a genuinely human, emotional level.",
        "The YTFlow philosophy is simple: use AI as your tireless creative assistant, never as your replacement. Let it handle the heavy lifting of research, structure, and quantity — then layer your unique personality, voice, and perspective on top of everything it produces.",
        "The future of content creation isn't AI versus humans in some zero-sum battle. It's AI and humans working together in tight collaboration to produce better content than either could ever create alone. The creators who embrace this partnership today will dominate their niches tomorrow.",
      ],
    },
  };

  const article = articles[slug];

  if (!article) {
    return (
      <div className="blog-detail-page page-transition" style={{ textAlign: 'center', padding: 80 }}>
        <h2 className="neon-text">Article not found</h2>
        <button className="neon-btn" onClick={() => navigate('/blog')} style={{ marginTop: 24 }}>
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-detail-page page-transition">
      {/* Back Button */}
      <button className="neon-btn back-btn" onClick={() => navigate('/blog')}>
        <FiArrowLeft /> Back to Blog
      </button>

      {/* Hero Image */}
      <div className="blog-detail-hero">
        <img src={article.image} alt={article.title} />
      </div>

      {/* Article Header */}
      <div className="blog-detail-header">
        <span className="blog-detail-category">
          <FiTag size={14} /> {article.category}
        </span>
        <h1 className="neon-text">{article.title}</h1>
        <div className="blog-detail-meta">
          <span><FiUser size={16} /> {article.author}</span>
          <span><FiCalendar size={16} /> {article.date}</span>
          <span><FiClock size={16} /> {article.readTime}</span>
        </div>
      </div>

      {/* Article Content */}
      <GlassCard className="blog-detail-content">
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}

        {/* Share / Bookmark */}
        <div className="blog-detail-actions">
          <button className="neon-btn">
            <FiShare2 /> Share
          </button>
          <button className="neon-btn" style={{ borderColor: '#ff6bcb', color: '#ff6bcb' }}>
            <FiBookmark /> Bookmark
          </button>
        </div>
      </GlassCard>
    </div>
  );
}