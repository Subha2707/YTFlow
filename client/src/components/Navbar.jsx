import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard, MdAnalytics, MdLogout } from 'react-icons/md';
import { FcPlanner } from 'react-icons/fc';
import { IoIosSave } from 'react-icons/io';
import { FiHome, FiZap, FiInfo, FiPlay, FiBookOpen, FiMenu, FiX, FiChevronDown, FiMail, FiHelpCircle, FiGrid } from 'react-icons/fi';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const toggleServices = (e) => {
    e.stopPropagation();
    setServicesOpen(!servicesOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="nav-logo-frame" onClick={closeMenu}>
        <img src="/favicon2.png" alt="YTFlow Logo" className="logo-img" />
        <span className="logo-text">YTFlow</span>
      </Link>

      {/* Hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} />}

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {/* 1. Home (always visible) */}
        <Link to="/" onClick={closeMenu}><FiHome /> Home</Link>

        {/* 2. Dashboard (only when logged in) */}
        {token && (
          <Link to="/dashboard" onClick={closeMenu}><MdDashboard /> Dashboard</Link>
        )}

        {/* 3. Services Dropdown (only when logged in) */}
        {token && (
          <div className={`nav-dropdown ${servicesOpen ? 'open' : ''}`} ref={dropdownRef}>
            <button className="nav-dropdown-trigger" onClick={toggleServices}>
              <FiGrid /> Services <FiChevronDown size={14} className={`dropdown-arrow ${servicesOpen ? 'rotated' : ''}`} />
            </button>
            {servicesOpen &&(
              <div className='nav-dropdown-menu'>
                <Link to="/planner" onClick={closeMenu}><FcPlanner /> Planner</Link>
                <Link to="/saved" onClick={closeMenu}><IoIosSave /> Saved Plans</Link>
                <Link to="/analytics" onClick={closeMenu}><MdAnalytics /> Analytics</Link>
              </div>
            )}
          </div>
        )}

        {/* 4. All other pages */}
        <Link to="/features" onClick={closeMenu}><FiZap /> Features</Link>
        <Link to="/how-it-works" onClick={closeMenu}><FiInfo /> How It Works</Link>
        <Link to="/tutorials" onClick={closeMenu}><FiPlay /> Tutorials</Link>
        <Link to="/blog" onClick={closeMenu}><FiBookOpen /> Blog</Link>
        <Link to="/faq" onClick={closeMenu}><FiHelpCircle /> FAQ</Link>
        <Link to="/contact" onClick={closeMenu}><FiMail /> Contact</Link>

        {/* Auth buttons */}
        {token ? (
          <button onClick={handleLogout} className="nav-logout"><MdLogout /> Logout</button>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" onClick={closeMenu}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}