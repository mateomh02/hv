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
              <span className="container-menu__span--one"></span>
              <span className="container-menu__span--two"></span>
              <span className="container-menu__span--three"></span>
            </div>
            <ul className="menu">
              {menu.map((item, index) => (
                <li key={index}>
                  <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={item.url}>{item.nombre}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container__logo">
          {logo && <img src={logo.imagen_logo} alt="logo" />}
        </div>
        <div className="container__language">
          <div className="container__language__flag-arrow" onClick={activeChangeLenguage}>
            <span className="container__language__flag-arrow--name">
              {i18n.language === 'en' ? ('En') : ('Es')}
            </span>
            <span className="container__language__flag-arrow--img" >
              {i18n.language === 'en' ? (<Flag code={'US'} />) : (<Flag code={'CO'} />)}
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
