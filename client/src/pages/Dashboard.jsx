import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import GlassCard from '../components/Card';

export default function Dashboard() {
  const [planCount, setPlanCount] = useState(0);
  const [lastPlan, setLastPlan] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/plans');
        const plans = res.data;
        setPlanCount(plans.length);
        if (plans.length > 0) setLastPlan(plans[0].topic);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard page-transition">
      <h2 className="neon-text">Dashboard</h2>
      <div className="stats-grid">
        <GlassCard className="stat-card">
          <p>Total Plans</p>
          <h3 className="neon-text">{planCount}</h3>
        </GlassCard>
        <GlassCard className="stat-card">
          <p>Latest Topic</p>
          <h3>{lastPlan || '—'}</h3>
        </GlassCard>
      </div>
      <div className="card-actions">
        <Link to="/planner" className="neon-btn">Create New Plan</Link>
        <Link to="/saved" className="neon-btn">View Saved Plans</Link>
      </div>
    </div>
  );
}