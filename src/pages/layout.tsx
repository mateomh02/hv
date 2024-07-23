
import {Outlet} from "react-router-dom";
import Header from "../components/layout/header";

export default function Layout() {  

  return (
    <>
        <Header/>
        <Outlet/>
    </>         
  )
}
