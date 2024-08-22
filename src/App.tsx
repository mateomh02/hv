import { Routes, Route, useParams, useNavigate, Outlet } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Portafolio from "./pages/portafolio";
import Experiencia from "./pages/experiencia";
import NotFound from './pages/404'
import DescriptionEx from "./pages/descriptionEx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
// import './App.scss'
// import './styles/theme.scss'

// import { useState, useEffect } from "react";
// import { useTranslation } from 'react-i18next';

function App() {


  const { i18n } = useTranslation()
  // console.log()
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/experiencia" element={<Experiencia/>}/>
          <Route path="/portafolio/:title" element={<DescriptionEx/>}/>
          <Route path="/portafolio" element={<Portafolio/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
      <div></div>
    </div>
  );
}

export default App;
