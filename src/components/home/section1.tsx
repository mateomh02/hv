import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface InfoHome {
    name_developer: string,
    url_img: string
}
export default function Section1() {
    // ============== * Variable breakdown * ===============
    const { i18n } = useTranslation();
    const [homeInfo, setHomeInfo] = useState<InfoHome[]>([])
    const containerH1 = useRef<HTMLDivElement>(null);
    // =====================================================

    // ============== * Animation Gsap * ================
    // useGSAP(() => {
    //     // const cont = ''
    //     gsap.to("", {
    //         // ease: "none",
    //         // x: () => -(cont.scrollWidth - window.innerWidth),
    //         // scrollTrigger: {
    //         //     trigger: cont,
    //         //     pin: $('.field--name-field-cards-domino-multimedia'),
    //         //     start: "center center",
    //         //     end: () => "+=" + (cont.scrollWidth - window.innerWidth),
    //         //     scrub: true,
    //         //     invalidateOnRefresh: true,
    //         //     // markers: true,
    //         // }
    //     },{scope: containerH1})
    // })

    useGSAP(() => {
        gsap.to(".section-container-one__name__text", {
            ease: "none",
            x: () => -(containerH1.current!.scrollWidth - window.innerWidth),
            scrollTrigger: {
                trigger: containerH1.current,
                pin: containerH1.current,
                start: "bottom bottom",
                end: () => "+=" + (containerH1.current!.scrollWidth - window.innerWidth),
                scrub: true,
                invalidateOnRefresh: true,
                markers: true,
            }
        });
    },
        { dependencies: [homeInfo], scope: containerH1 })
    // ==================================================

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
    return (
        <section className="section-container-one">
            <div className="section-container-one__name" ref={containerH1}>
                {homeInfo.map((info, index) => (
                    info.name_developer &&
                    <h1 key={index} className="section-container-one__name__text">{info.name_developer.split(/\/(.*?)\//g).map((part, i) => i % 2 === 1 ? (
                        <span>{part}</span>
                    ) : (
                        part
                    ))} <span></span></h1>
                ))}

            </div>
            <div className="section-container-one__img">
                {homeInfo.map((info, index) => (
                    info.url_img && (
                        <img src={info.url_img} alt="logo" />
                    )
                ))}
            </div>
        </section>)
}