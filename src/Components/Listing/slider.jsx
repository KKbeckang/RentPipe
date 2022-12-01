import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
export default function Slider(props) {
    
    const carouselItems = props.img.map((img) =>  {
        return (<Carousel.Item>
        <Image fluid
          className="d-block w-100"
          src={img}
          alt="House images"
        />
      </Carousel.Item>
        )
    }
   
  );  

    
    return (
     <div className='carouselListing'>
        <Carousel fade>
            {carouselItems}
          </Carousel>
     </div>
    );
  }