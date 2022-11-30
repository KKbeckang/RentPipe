import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function Slider(props) {
    
    const carouselItems = props.img.map((img) =>  {
        return (<Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="First slide"
        />
      </Carousel.Item>
        )
    }
   
  );  

    
    return (
     <div>
        <Carousel fade>
            {carouselItems}
          </Carousel>
     </div>
    );
  }