import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
// eslint-disable-next-line no-unused-vars
import GlassCard from '../components/Card';
import Loader from '../components/Loader';

import { FaCalendarAlt, FaLightbulb, FaTag } from "react-icons/fa";
import { MdSubtitles, MdDescription } from "react-icons/md";

export default function PlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await API.get(`/api/plans/${id}`); // we need to add a GET single plan route on backend
        setPlan(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert('Plan not found');
        navigate('/saved');
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (!plan) return null;

  const isCalendar = plan.generatedContent?.calendar && Array.isArray(plan.generatedContent.calendar);

  return (
    <div className="plan-detail page-transition">
      <button onClick={() => navigate(-1)} className="neon-btn" style={{ marginBottom: 32 }}>← Back</button>
      <h2 className="neon-text">{plan.topic}</h2>
      <p className="plan-date">Created: {new Date(plan.createdAt).toLocaleString()}</p>

      {isCalendar ? (
        <div className="calendar-detail">
          <h3><FaCalendarAlt/> 7‑Day YouTube Calendar</h3>
          <div className="calendar-grid">
            {plan.generatedContent.calendar.map((day, idx) => (
              <div key={idx} className="calendar-day-card">
                <h4 className="day-title">{day.day}</h4>
                <p><strong>Topic:</strong> {day.topic}</p>
                <p><strong>Title:</strong> {day.title}</p>
                <p><strong>Format:</strong> {day.format}</p>
                <p><strong>Description:</strong> {day.description}</p>
                <div className="tags">
                  {day.tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
                </div>
                <p><strong>Thumbnail:</strong> {day.thumbnailConcept}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="single-plan-detail results-container">
          <div className="result-section">
            <h3><FaLightbulb/> Video Ideas</h3>
            <ul>
              {plan.generatedContent.ideas?.map((idea, idx) => (
                <li key={idx}>{idea}</li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3><MdSubtitles/> Titles</h3>
            <ul>
              {plan.generatedContent.titles?.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3><FaTag/> Tags</h3>
            <div className="tags">
              {plan.generatedContent.tags?.map((tag, idx) => (
                <span className="tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="result-section">
            <h3><MdDescription/> Description</h3>
            <p>{plan.generatedContent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}