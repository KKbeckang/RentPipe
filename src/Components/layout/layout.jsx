import React from "react";
import Navbar from "./Navbar/Navbar";
//import Footer from "./Footer/Footer";
// import Content from "../Content/Content";




const Layout =(props)=> {
    return (      
      <>
        <Navbar/>
        <div className="row">
          
          <div className="col-md-12">{props.children}</div>

        </div>
       
      </>
    );
  }


export default Layout;
