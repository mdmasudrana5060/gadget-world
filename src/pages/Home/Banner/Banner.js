import React from 'react';
import { Carousel } from "@material-tailwind/react";




const Banner = () => {
    return (
      <Carousel >
      <img
    
        src='https://i.ibb.co/xCxvP3t/2234455.jpg'
        alt="image 1"
        className="h-full w-full object-cover"
      />
    
      <img
      
        src='https://i.ibb.co/PrQ08j6/electronic-devices-balancing-concept-1.jpg'
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
     
        src='https://i.ibb.co/GRLSYY2/top-view-virtual-reality-headset-white-headphones-1.jpg'
        alt="image 2"
        className="h-full w-full object-cover"
      />
     
    </Carousel>
    
     
    

      
    );
};

export default Banner