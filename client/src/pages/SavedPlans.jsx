import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import GlassCard from '../components/Card';
import { FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

export default function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get('/api/plans');
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      await API.delete(`/plans/${id}`);
      setPlans(plans.filter(plan => plan._id !== id));
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Delete failed');
    }
  };

  const isCalendar = (plan) => {
    return plan.generatedContent?.calendar && Array.isArray(plan.generatedContent.calendar);
  };

  return (
    <div className="saved-plans page-transition">
      <h2 className="neon-text">Saved Plans</h2>

      {plans.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.7, marginTop: 40 }}>
          No plans saved yet. Start generating some!
        </p>
      ) : (
        <div className="saved-plans-list">
          {plans.map((plan) => (
            <GlassCard key={plan._id} className="saved-plan-row">
              <div className="saved-plan-info">
                <h4 className="plan-topic-name">{plan.topic}</h4>
                <p className="plan-date">
                  {new Date(plan.createdAt).toLocaleDateString()} – {isCalendar(plan) ?(
                    <>
                      <FaCalendarAlt/> 7-Day Calendar
                    </>
                  ): (
                    <>
                      <FaFileAlt/> Single Plan
                    </>
                  )}
                </p>
              </div>
              <div className="saved-plan-actions">
                <button
                  className="neon-btn"
                  onClick={() => navigate(`/plans/${plan._id}`)}
                  style={{ padding: '6px 20px', fontSize: '0.85rem' }}
                >
                  View Details
                </button>
                <button
                  className="neon-btn delete-btn"
                  onClick={() => handleDelete(plan._id)}
                  style={{
                    padding: '6px 20px',
                    fontSize: '0.85rem',
                    borderColor: '#ff4d6a',
                    color: '#ff4d6a',
                  }}
                  onMouseEnter={e => { e.target.style.background = '#ff4d6a'; e.target.style.color = 'white'; }}
                  onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#ff4d6a'; }}
                >
                  Delete
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}