
import Section1 from '../components/home/section1';
import Section2 from '../components/home/section2';
import Section3 from '../components/home/section3';
import Section4 from '../components/home/section4';


export default function Home() {
  return (
    <main className="main-wrapper">
      <div className="container-home">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
    </main>
  )
}