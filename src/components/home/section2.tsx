import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next';
// import aos from 'AOS'
interface InfoHome {
    title: string,
    url_img_left: string,
    description: string,
    img_memoji: string,
}
export default function Section2() {
    const { i18n } = useTranslation();
    const [homeInfo, setHomeInfo] = useState<InfoHome[]>([])
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
    // AOS.init();
    return (<section className="section-container-two">
        <div className="section-container-two-wrapper">
            <div className="section-container-two-wrapper__rol">
                <span className="section-container-two-wrapper__rol--dev">developer</span>
                {homeInfo.map((item, index) => (
                    item.url_img_left && (
                        <div key={`section--2-${index}`} className="section-container-two-wrapper__rol--img"><img src={item.url_img_left} alt="memoji" /></div>
                    )
                ))}
            </div>

            {homeInfo.map((item, index) => (
                item.title && (
                    <div key={index} className="section-container-two-wrapper__info-staff">
                        <h2 className="section-container-two-wrapper__info-staff--title">{item.title.split('/')[0]} <span>{item.title.split('/')[1]}</span></h2>
                        <p className="section-container-two-wrapper__info-staff--description">{item.description}</p>
                        <div className="section-container-two-wrapper__info-staff--img"><img src={item.img_memoji} alt="memoji" /></div>
                    </div>
                )
            ))}


        </div>
    </section>)
}