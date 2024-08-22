import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { use } from "i18next";
gsap.registerPlugin(ScrollTrigger);
interface InfoHome {
    name_developer: string,
    url_img: string
}
export default function Section1() {
    // ============== * Variable breakdown * ===============
    const { i18n } = useTranslation();
    const [homeInfo, setHomeInfo] = useState<InfoHome[]>([])
    const containerH1 = useRef<HTMLDivElement>(null);
    // gsap.registerPlugin(ScrollTrigger);
    // =====================================================

    // ============== * UseEffect * ===============
    useEffect(() => {
        async function getHomeInfo() {
            try {
                const response = await fetch(`../json/home/${i18n.language}-home.json`)
                const data = await response.json();
                setHomeInfo(data)
            } catch (error) {
                console.error("Error fetching data: " + error)
            }
        }
        getHomeInfo()
    }, [i18n.language])
    // ============== * Animation Gsap * ================
    const textElement = containerH1.current?.querySelector<HTMLDivElement>(".section-container-one__name__text")
    useGSAP(() => {
        if(textElement){
            console.log('Hace la animacion, esta dentro del hook')
            gsap.to(textElement!, {
                ease: "none",
                x: () => -(textElement.scrollWidth - window.innerWidth),
                scrollTrigger: {
                    trigger: textElement,
                    pin: containerH1.current,
                    start: "bottom bottom",
                    end: () => "+=" + (textElement.scrollWidth - window.innerWidth),
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    markers: true,
                }
            });
        }else{
            console.log('No hace la animacion')
        }
    },
        { dependencies: [homeInfo, i18n.language], revertOnUpdate: true})
    // ==================================================
    return (
        <section className="section-container-one" ref={containerH1}>
            <div className="section-container-one__name" >
                {homeInfo.map((info, index) => (
                    info.name_developer &&
                    <h1 key={`section-one-${index}`} className="section-container-one__name__text">{info.name_developer.split(/\/(.*?)\//g).map((part, i) => i % 2 === 1 ? (
                        <span key={`key-span-${i}`}>{part}</span>
                    ) : (
                        part
                    ))} <span></span></h1>
                ))}

            </div>
            <div className="section-container-one__img">
                {homeInfo.map((info, index) => (
                    info.url_img && (
                        <img key={`img--${index}`} src={info.url_img} alt="logo" />
                    )
                ))}
            </div>
        </section>)
}