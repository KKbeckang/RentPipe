import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4 item">
            </div>
            <div className="col-md-8 item text">
              {/*Add some Text here like motto of the project or something about Rent Pipe*/}
            </div>
            <div className="col item social">
              <p>Connect over
              <a href="/" className="a1">
               <p>Github <i className="l1 icon ion-social-github"></i></p>
              </a>
              </p>
            </div>
          </div>
          <p className="c1 ">RentPipe © 2022</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
