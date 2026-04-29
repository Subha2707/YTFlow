import { useEffect, useState } from 'react';
import API from '../api';
import GlassCard from '../components/Card';

export default function SavedPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await API.get('/plans');
      setPlans(res.data);
    };
    fetchPlans();
  }, []);

  return (
    <div className="saved-plans page-transition">
      <h2 className="neon-text">Saved Plans</h2>
      <div className="plans-list">
        {plans.map((plan) => (
          <GlassCard key={plan._id} className="plan-card">
            <h4>{plan.topic}</h4>
            <p className="plan-date">{new Date(plan.createdAt).toLocaleDateString()}</p>
            <div className="result-section">
              <h5>Ideas:</h5>
              <ul>{plan.generatedContent.ideas?.map((idea, i) => <li key={i}>{idea}</li>)}</ul>
            </div>
            <div className="tags">
              {plan.generatedContent.tags?.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}