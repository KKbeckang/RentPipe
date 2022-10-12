import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
// import Content from "../Content/Content";




const Layout =(props)=> {
    return (      
      <>
        <Navbar/>
        <div className="row">
          <div className="col-md-1">{/* Azure Bot */}</div>
          <div className="col-md-10">{props.children}</div>
          <div className="col-md-1">
            {/* Google DialogFlow Bot*/}
          </div>
        </div>
        <Footer/>
      </>
    );
  }


export default Layout;
