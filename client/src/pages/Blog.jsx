import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/Card';
import { FiArrowRight, FiCalendar, FiUser, FiTag, FiClock } from 'react-icons/fi';

export default function Blog() {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      slug: 'ai-tools-youtube-creators-2025',
      title: '5 AI Tools Every YouTube Creator Should Use in 2025',
      excerpt: 'Discover the best AI-powered tools that are transforming how creators brainstorm, optimize, and schedule content.',
      author: 'YTFlow Team',
      date: 'May 15, 2025',
      readTime: '6 min read',
      category: 'AI',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600', // AI/robot image
    },
    {
      id: 2,
      slug: 'rank-videos-higher-seo-tags',
      title: 'How to Rank Your Videos Higher with SEO Tags',
      excerpt: 'Learn the science behind YouTube SEO tags and how to choose keywords that actually drive views.',
      author: 'YTFlow Team',
      date: 'May 10, 2025',
      readTime: '8 min read',
      category: 'SEO',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', // analytics chart
    },
    {
      id: 3,
      slug: 'content-calendar-consistent-growth',
      title: 'The Power of a Content Calendar for Consistent Growth',
      excerpt: 'Why planning your content a week ahead can 3x your upload consistency and audience engagement.',
      author: 'YTFlow Team',
      date: 'May 5, 2025',
      readTime: '5 min read',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600', // calendar/planner
    },
    {
      id: 4,
      slug: 'youtube-analytics-beyond-views',
      title: 'Understanding YouTube Analytics: Beyond Views and Likes',
      excerpt: 'A deep dive into YouTube metrics — watch time, CTR, retention, and what really matters for growth.',
      author: 'YTFlow Team',
      date: 'April 28, 2025',
      readTime: '10 min read',
      category: 'Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', // data dashboard
    },
    {
      id: 5,
      slug: 'zero-to-10k-subscribers-blueprint',
      title: 'From Zero to 10K Subscribers: A Content Strategy Blueprint',
      excerpt: 'The exact step-by-step content plan used by successful creators to grow their channels from scratch.',
      author: 'YTFlow Team',
      date: 'April 20, 2025',
      readTime: '12 min read',
      category: 'Growth',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600', // youtube play button
    },
    {
      id: 6,
      slug: 'human-ai-collaboration',
      title: 'Why Human + AI Collaboration Beats AI Alone',
      excerpt: "The best content strategies combine human creativity with AI efficiency. Here's how to find the balance.",
      author: 'YTFlow Team',
      date: 'April 12, 2025',
      readTime: '7 min read',
      category: 'AI',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600', // robot hand human hand
    },
  ];

  return (
    <div className="blog-page page-transition">
      <div className="page-header">
        <h1 className="neon-text">Blog</h1>
        <p>Tips, strategies, and insights to grow your YouTube channel</p>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <GlassCard key={post.id} className="blog-card">
            {/* Card Image */}
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <span className="blog-card-category">
                <FiTag size={12} /> {post.category}
              </span>
            </div>

            {/* Card Body */}
            <div className="blog-card-body">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>

              <div className="blog-meta">
                <span><FiUser size={14} /> {post.author}</span>
                <span><FiCalendar size={14} /> {post.date}</span>
                <span><FiClock size={14} /> {post.readTime}</span>
              </div>
            </div>

            {/* Read More Button */}
            <button
              className="neon-btn blog-read-btn"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              Read Article <FiArrowRight style={{ marginLeft: 6 }} />
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}