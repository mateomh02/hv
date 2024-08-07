import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { Routes, Route, useParams, useNavigate, Outlet } from "react-router-dom";

interface NetworkItem {
  key: String
  url_img: String
  url_profile: String
}

interface NetworkData {
  key: string
  url_img: string
  url_profile: string
}

export default function Footer() {
  const { i18n } = useTranslation();
  const [infoFooter, setInfoFooter] = useState<NetworkData[]>([]);
  useEffect(() => {
    async function infoFooter() {
      try {
        const response = await fetch(`../json/menu-footer/${i18n.language}-footer.json`)
        const data = await response.json()
        setInfoFooter(data[0].network)
      } catch (error) {
        console.log('Ocurrio un error: ' + error)
      }
    }
    infoFooter()
  }, [i18n.language])
  return (
    <footer>
      <section className="section-footer section-footer--one">
        <nav className="section-footer--one__nav">
          <ul>
            {infoFooter.map((item, index) => (
              item.key !== "logo" && (
                <li key={index}> <a href={item.url_profile}><img src={item.url_img} alt={item.key} /></a></li>
              )
            ))}
          </ul>
        </nav>
      </section>
      <section className="section-footer section-footer--two">
        {infoFooter.map((item, index) => (
          item.key == "logo" && (
            <a key={index} href={item.url_profile}><img src={item.url_img} alt={item.key} /></a>
          )
        ))}
      </section>
    </footer>)
}