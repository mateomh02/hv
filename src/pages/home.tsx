import { error } from "console";
import { use } from "i18next"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next';

interface Info {
  items: [
    nombre: string,
    url: string
  ]
}
export default function Home() {
  const [info, setInfo] = useState<Info[]>([]);
  const { i18n } = useTranslation();
  useEffect(() => {
    async function getInfoPage() {
      try {
        const response = await fetch(`../json/menu-header/${i18n.language}-header.json`)
        if(!response){
          throw new Error('Network response was not ok :( ')
        }
        const data =  await response.json();
        setInfo(data)
      } catch (error) {
        console.error('There was a problem with the fetch operation '+error)
      }
    }
    getInfoPage()
  }, [i18n.language])

  // console.log(info)
  return  (
    <h1>
      Home
    </h1>
  )
}