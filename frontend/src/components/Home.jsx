import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <h1>Chaintech</h1>
        </div>
        <nav>
          <Link to="/manage-account" className="nav-link">Manage Account</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>
      <section className="home-hero">
        <div className="hero-content">
          <h2>Welcome to Your Dashboard</h2>
          <p>Your gateway to manage your account and stay updated.</p>
          <Link to="/manage-account" className="cta-button">Get Started</Link>
        </div>
      </section>
      <section className="home-features">
        <div className="feature">
          <div className="feature-icon">🌟</div>
          <h3>Feature 1</h3>
          <p>Explore the amazing features we offer to enhance your experience.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⚙️</div>
          <h3>Feature 2</h3>
          <p>Customize and control your settings with ease and precision.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📈</div>
          <h3>Feature 3</h3>
          <p>Track your progress and achieve your goals effortlessly.</p>
        </div>
      </section>
      <footer className="home-footer">
        <p>&copy; 2024 My Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
