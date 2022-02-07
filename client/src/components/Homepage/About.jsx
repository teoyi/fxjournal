import React from 'react';
import Book from '../../asset/large-icons/book.png';
import Chart from '../../asset/large-icons/chart.png';
import Camera from '../../asset/large-icons/camera.png';

const About = () => {
  return (
        <div className="h-4/6 w-full flex flex-row items-center justify-evenly bg-black" id="about">
            {/* probably three cards centered */}
            <div className="flex flex-col justify-center items-center text-banana m-10 text-center">
                <img src={Chart} alt="book icon" className="w-2/6 " />
                <h1 className="my-3 text-l font-semibold uppercase">forex currencies</h1>
                <p className="w-80">Information of currency pairs at your fingertips and your dispoal</p>
            </div>
            <div className="flex flex-col justify-center items-center text-banana m-10 text-center">
                <img src={Book} alt="book icon" className="w-2/6 " />
                <h1 className="my-3 text-l font-semibold uppercase">Journalling</h1>
                <p className="w-80">Journal and reflect on your strategy using our platform as a medium</p>
            </div>
            <div className="flex flex-col justify-center items-center text-banana m-10 text-center">
                <img src={Camera} alt="book icon" className="w-2/6 "/>
                <h1 className="my-3 text-l font-semibold uppercase">Ongoing news</h1>
                <p className="w-80">Stay in the know of current events, never trade again during high risk period</p>
            </div>
        </div>
    );
};

export default About;
