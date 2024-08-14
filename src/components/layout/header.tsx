import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import Flag from 'react-world-flags';
import gsap from 'gsap';

interface MenuItem {
  nombre: string,
  url: string
}

interface LogoMenu {
  imagen_logo: string
}

export default function Header() {
  const { i18n } = useTranslation();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [logo, setLogo] = useState<LogoMenu>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(false)


  useEffect(() => {
    async function fetchHeaderData() {
      try {
        const response = await fetch(`../json/menu-header/${i18n.language}-header.json`);
        const data = await response.json();
        setMenu(data.items);
        setLogo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchHeaderData();
  }, [i18n.language]);



  const changeLanguage = (language: string) => {
    console.log('Lenguaje '+language)
    i18n.changeLanguage(language);
    setActiveLanguage(!activeLanguage)
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const activeChangeLenguage = () => {
    setActiveLanguage(!activeLanguage)
  }
  return (
    <header className="">
      <div className="container">
        <div onClick={toggleMenu} className={`menu-navigation ${isMenuOpen ? 'open' : ''}`}>
          <div className="container-menu">
            <div className="container-menu__span">
              <button className={`menu menu-navigation ${isMenuOpen ? 'opened' : ''}`} aria-label="Main Menu">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                </svg>
              </button>
            </div>
            <div className={`container-menu__items ${isMenuOpen ? 'open' : ''}`}>
              <ul >
                {menu.map((item, index) => (
                  <li key={index}>
                    <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={item.url}>{item.nombre}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="container__logo">
          <NavLink to='/'>
            {logo && <img src={logo.imagen_logo} alt="logo" />}
          </NavLink>
        </div>
        <div className="container__language">
          <div className="container__language__flag-arrow" onClick={activeChangeLenguage}>
            <span className="container__language__flag-arrow--name">
              {i18n.language === 'en' ? ('En') : ('Es')}
            </span>
            <span className="container__language__flag-arrow--img" >
              {i18n.language === 'en' ? (<Flag code={'GB'} />) : (<Flag code={'CO'} />)}
            </span>
            <span className="container__language__flag-arrow--arrow"></span>
          </div>

          <div className={`container__language--buttons ${activeLanguage ? 'active' : ''}`}>
            <div className="container__language--buttons--select">
              <button className={`container__language--select-lng--en ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')}>En</button>
              <button className={`container__language--select-lng--es ${i18n.language === 'es' ? 'active' : ''}`} onClick={() => changeLanguage('es')}>Es</button>
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
