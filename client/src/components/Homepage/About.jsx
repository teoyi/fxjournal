import React from 'react';
import Book from '../../asset/large-icons/book.png';
import Chart from '../../asset/large-icons/chart.png';
import Camera from '../../asset/large-icons/camera.png';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="h-4/6 w-full flex flex-row items-center justify-center bg-black text-banana py-10" id="about">
            {/* probably three cards centered */}
            <div className="lg:max-w-screen-lg 2xl:max-w-screen-2xl w-full flex flex-row justify-center items-center">
                {/* <div className="flex flex-col justify-center items-center text-banana m-10 text-center">
                    <img src={Chart} alt="book icon" className="w-2/6" />
                    <h1 className="my-3 text-l font-semibold uppercase">forex currencies</h1>
                    <p className="w-80">Information of currency pairs at your fingertips and your dispoal</p>
                </div>
                <div className="flex flex-col justify-center items-center text-banana m-10 text-center">
                    <img src={Book} alt="book icon" className="w-2/6 " />
                    <h1 className="my-3 text-l font-semibold uppercase">Journalling</h1>
                    <p className="">Journal and reflect on your strategy using our platform as a medium</p>
                </div>
                <div className="flex flex-col justify-center items-center text-banana m-10 text-center">
                    <img src={Camera} alt="book icon" className="w-2/6 "/>
                    <h1 className="my-3 text-l font-semibold uppercase">Ongoing news</h1>
                    <p className="w-80">Stay in the know of current events, never trade again during high risk period</p>
                </div> */}
                <div className="w-1/3">
                    <h1 className="uppercase font-goshbe text-9xl mb-5">features</h1>
                    <p className="mb-10 text-lg">Take a look at what fxjournal has to offer and decide for yourself if it would be the right tool to take your trading journey to another level! </p>
                    <button className="bg-banana text-black px-10 py-2 rounded-full">
                        <Link to="/register" className="text-xl font-semibold">Sign Up</Link>
                    </button>
                </div>
                <div className="w-2/3 flex lg:flex-col 2xl:flex-row ">
                    <div className="flex w-full lg:flex-row 2xl:flex-col lg:justify-start lg:items-center text-banana p-10">
                        <img src={Chart} alt="book icon" className="w-[100px]" />
                        <div className="flex flex-col justify-start w-full items-start lg:ml-20p 2xl:ml-0 2xl:text-center">
                            <h1 className="my-3 text-xl text-center w-full font-semibold uppercase">forex currencies</h1>
                            <p className="">fxjournal is created in mind as a one stop shop where traders are able to access market data straight from their dashboard as a form of reviewing or keeping updated to market movements while journalling.</p>
                        </div>
                    </div>
                    <div className="flex w-full lg:flex-row 2xl:flex-col lg:justify-start lg:items-center text-banana p-10">
                        <img src={Book} alt="book icon" className="w-[100px]" />
                        <div className="flex flex-col justify-start w-full items-start lg:ml-20p 2xl:ml-0 2xl:text-center">
                            <h1 className="my-3 text-xl text-center w-full font-semibold uppercase">Journalling</h1>
                            <p className="">Journalling and reflecting upon closed trades are key for traders to succeed. Our journalling system is centered around numbers which makes back testing convenient and forward testing more consistent.</p>
                        </div>
                    </div>
                    <div className="flex w-full lg:flex-row 2xl:flex-col lg:justify-start lg:items-center text-banana p-10">
                        <img src={Camera} alt="book icon" className="w-[100px]" />
                        <div className="flex flex-col justify-start w-full items-start lg:ml-20p 2xl:ml-0 2xl:text-center">
                            <h1 className="my-3 text-xl text-center w-full font-semibold uppercase">Ongoing news</h1>
                            <p className="">No matter, if you are a news-centric trader or not, having current information at your fingertips will give you an edge by allowing you to stay in the know of when and what high risk news are imminent.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
