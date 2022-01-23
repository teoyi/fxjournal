import React from 'react';
// import hero from '../../asset/hero-removebg-preview.png';s

const Hero = () => {
  return (
        <div className="hero-wrapper bg-hero-image h-screen bg-cover">
            <div className="hero bg-gradient-to-b from-black w-full h-screen flex flex-col justify-center items-center">
                {/* <img src={hero} alt="hero logo" className="justify-center items-center object-none" /> */}
                <div className="font-goshbe text-amber-300 text-center leading-hero-lh -mt-40 lg:text-hero-lg md:text-hero-md">fxjournal</div>
                <div className="text-amber-300 uppercase font-semibold text-xl">forex ● trading journal ● news </div>
            </div>
        </div>
    );
};

export default Hero;
