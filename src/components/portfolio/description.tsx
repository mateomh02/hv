import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

interface infoPortfolio {
    title: string
    image: string,
    description: string
    link: string
}
export default function Description() {
    const param = useParams()
    const [infoPort, setInfoPort] = useState<infoPortfolio | null>(null)
    const { i18n } = useTranslation()
    useEffect(() => {
        async function getInfo() {
            const response = await fetch(`../json/portfolio/${i18n.language}-portfolio.json`)
            const data = await response.json()
            const filterData = data.find((item: infoPortfolio) => item.title === param.title)
            setInfoPort(filterData || null)
        }
        getInfo()
    }, [i18n.language])
    if (!infoPort) return (<h1>No se encontro informacion existente</h1>)
    return (
        <div className="container-description-work">
            <div className="container-description-work__content">
                <div className="container-description-work__img">
                    <img src={infoPort.image} alt="" />
                </div>
                <div className="container-description-work__title">
                    <h1>{infoPort.title}</h1>
                </div>
                <div className="container-description-work__description">
                    <p>{infoPort.description}</p>
                </div>
                <div className="container-description-work__link">
                    <a href={infoPort.link}>{i18n.language === 'es' ? 'Ver mas' : 'View more'}</a>
                </div>
            </div>
        </div>
    )
}