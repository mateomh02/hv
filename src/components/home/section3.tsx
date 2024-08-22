import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
interface infoSkill {
  key: string,
  value: string
}

export default function Section3() {
  const { i18n } = useTranslation();
  const [skills, setSkills] = useState<string[]>([]);
  const [infoSkills, setInfoSkills] = useState<infoSkill[]>([]);
  const [img, setImage] = useState(String)
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState([])

  useEffect(() => {
    async function fetchInfoSection() {
      const response = await fetch(`../json/home/${i18n.language}-home.json`)
      const data = await response.json()
      const skillsData = data[2].section_skills[0]?.value.split('-') || [];
      const infoSkillData = data[2].section_skills
      const imgUrl = data[1].img_memoji
      setImage(imgUrl)
      setInfoSkills(infoSkillData)
      setSkills(skillsData)
    }
    fetchInfoSection()
  }, [i18n.language])

  return (
    <section className="section-container-three">
      <nav className="container-skills">
        <ul>  
          {skills.map((item, index)=>(
            <li key={`skill-${index}`}>{
              <Link activeClass="active" to={`item-${index+1}`}  spy={true} smooth={true} offset={0} duration={500} >{item}</Link>
            }</li>
          ))}
        </ul>

      </nav>
      <div className="container-skills__info">
        {infoSkills.map((item, index)=>(
          item.key !== 'title' ?(
              <Element key={`infoSkills-${index}`} name={`item-${index}`} className="container-skills__info__element element">
                <div className="container-skills__info__element--item">
                  <span>{item.value.split('-')[0]}</span><p>{item.value.split('-')[1]}</p>
                </div>
                <div className="container-skills__info__element--img">
                  <img key={`img-${index}`} src={img} alt={`Memoji ${index}`} />
                </div>
              </Element>
          ) : null
        ))}
      </div>

    </section>
  );
}