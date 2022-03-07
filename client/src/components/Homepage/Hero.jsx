import React from 'react';
// import hero from '../../asset/hero-removebg-preview.png';s

const Hero = () => {
    return (
        <div className="hero-wrapper bg-hero-image h-hero-home bg-cover">
            <div className="hero bg-gradient-to-b from-black w-full h-hero-home flex flex-col justify-center items-center">
                {/* <img src={hero} alt="hero logo" className="justify-center items-center object-none" /> */}
                <div className="font-goshbe text-banana text-center leading-hero-lh lg:-mt-14r 2xl:-mt-17r lg:text-hero-lg 2xl:text-hero-xl md:text-hero-md">fxjournal</div>
                <div className="text-banana uppercase font-semibold text-xl">forex ● trading journal ● news </div>
            </div>
        </div>
    );
};

export default Hero;
