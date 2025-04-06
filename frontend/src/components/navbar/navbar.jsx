import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './navbar.css';

const Navbar = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const navText = {
    my_portfolio: {
      en: 'My Portfolio',
      vi: 'Portfolio của tôi',
      de: 'Mein Portfolio'
    },
    aboutme: {
      en: 'About Me', 
      vi: 'Về tôi',
      de: 'Über mich'
    },
    projects: {
      en: 'Projects',
      vi: 'Dự án',
      de: 'Projekte'
    },
    contact: {
      en: 'Contact',
      vi: 'Liên hệ',
      de: 'Kontakt'
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">{navText.my_portfolio[language]}</span>
      </div>

      <div className="navbar-right">
        <div className="navbar-links">
          <a href="#aboutme">{navText.aboutme[language]}</a>
          <a href="#projects">{navText.projects[language]}</a>
          <a href="#contact">{navText.contact[language]}</a>
        </div>

        <div className="navbar-icons">
          <div className="navbar-language-dropdown">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="navbar-icon-btn">
              <Icon icon="material-symbols:globe" width="24" />
            </button>
            {isLangOpen && (
              <div className="navbar-dropdown-content">
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
                <button onClick={() => changeLanguage('de')}>Deutsch</button>
            </div>
            )}
          </div>
        </div>
      </div>

      <button className="navbar-menu-btn" onClick={toggleMenu}>
        <Icon icon="material-symbols:menu-rounded" width="32" />
      </button>

      {isMenuOpen && (
        <div className="navbar-mobile-menu">
            <a href="#aboutme">{navText.aboutme[language]}</a>
            <a href="#projects">{navText.projects[language]}</a>
            <a href="#contact">{navText.contact[language]}</a>
            <div className="navbar-mobile-icons">
                <button 
                  onClick={() => changeLanguage('vi')} 
                  className="navbar-icon-btn"
                >
                  <Icon icon="openmoji:flag-vietnam" width="28" />
                </button>
                
                <button 
                  onClick={() => changeLanguage('en')} 
                  className="navbar-icon-btn"
                >
                  <Icon icon="openmoji:flag-united-kingdom" width="28" />
                </button>
                <button 
                  onClick={() => changeLanguage('de')} 
                  className="navbar-icon-btn"
                >
                  <Icon icon="openmoji:flag-germany" width="28" />
                </button>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;