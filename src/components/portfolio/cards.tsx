import { info } from "console";
import { use } from "i18next"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

interface infoPortfolio {
    title: string
    image: string,
    description: string
}
export default function PortafolioCards() {
    const [infoPort, setInfoPort] = useState<infoPortfolio[]>([])
    const { i18n } = useTranslation()
    useEffect(() => {
        async function getInfo() {
            const response = await fetch(`../json/portfolio/${i18n.language}-portfolio.json`)
            const data = await response.json()
            setInfoPort(data)
        }
        getInfo()
    }, [i18n.language])
    return (
        <div className="container-portfolio">
            {i18n.language == 'es' ? <h1 className="container-portfolio__title">PORTAFOLIO</h1> : <h1 className="container-portfolio__title">PORTFOLIO</h1>}
            <ul>
                {infoPort.map((item, index) => (
                    <li key={`cards-number--${index}`} className="container-portfolio__cards">
                        <div className="container-portfolio__cards--front">
                            <div className="container-portfolio__cards--front--img">
                                <img src={item.image} alt="img" />  
                            </div>
                        </div>
                        <div className="container-portfolio__cards--back">
                            {/* <p>{item.description}</p> */}
                            <Link to={`/portafolio/${item.title}`} className="button" type="button">Ver mas</Link>
                        </div>
                    </li>

                ))}

            </ul>
        </div>
    )
}