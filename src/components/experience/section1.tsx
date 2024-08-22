import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface infoEx {
  date: string,
  title: string,
  description: string,
  img: string
}
export default function Section1() {
  const [info, setInfo] = useState<infoEx[]>([])
  const { i18n } = useTranslation()
  const navContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await fetch(`../json/experience/${i18n.language}-experience.json`)
        const data = await response.json()
        setInfo(data)
      } catch (error) {
        console.log("An erro has ocurred: " + error)
      }
    }
    fetchInfo()
  }, [i18n.language])

  // const textElement = navContainer.current?.querySelector<HTMLDivElement>(".unico1")
  // useGSAP(() => {
  //     if(textElement){
  //         console.log('Hace la animacion, esta dentro del hook')
  //         gsap.to(textElement!, {
  //             ease: "none",
  //             x: () => -(textElement.scrollWidth - window.innerWidth),
  //             scrollTrigger: {
  //                 trigger: textElement,
  //                 pin: navContainer.current,
  //                 pinSpacing: false,
  //                 start: "top top",
  //                 end: () => "+=" + (textElement.scrollWidth - window.innerWidth),
  //                 scrub: 0.5,
  //                 invalidateOnRefresh: true,
  //                 markers: true,
  //             }
  //         });
  //     }else{
  //         console.log('No hace la animacion')
  //     }
  // },
  //     { dependencies: [info, i18n.language], revertOnUpdate: true})

  return (<section className='container-experiencia__section2-experience'>
    <nav>
      <div className='container-experiencia__section2-experience__marker'></div>
      <div className='container-experiencia__section2-experience__date' ref={navContainer}>
        <ul>
          {info.map((item, index) => (
            <li key={`dateEx-${index}`}>
              <Link to={`date-number${index + 1}`} spy={true} smooth={true} offset={0} duration={500}>
                {item.date}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='container-experiencia__section2-experience__sections'>
        <ul>
          {info.map((item, index) => (
            <li key={`dateExSection-${index}`}>
              <Element name={`date-number${index + 1}`} className='container-experiencia__section2-experience__sections__item'>
                <div className='container-experiencia__section2-experience__sections__item__container'>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
                <div className='container-experiencia__section2-experience__sections__item__img'>
                  <img src={item.img} alt="img" />  
                </div>
              </Element>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </section>)
}