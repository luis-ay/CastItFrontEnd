import photo from '../../assets/E25A6528.jpg'
import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-white flex-col justify-center align-middle w-full pt-10 px-auto text-center">
            <section className="w-full h-full flex-col">
                <h1 className="font-Poppins font-semibold text-4xl tracking-wide text-black pb-2 border-b-4 border-gray-200 w-1/2 mx-auto">Creator</h1>
                <img src={photo} alt="rank voting shown" className="mx-auto px-16 scale-75 rounded-full"></img>
                <p className="font-sans-serif font-medium text-xl text-gray-500 mb-4">Hi, my name is Luis.</p>
                <p className="font-sans-serif font-thin text-xl text-gray-500 mb-10 text-left mx-10">I'm a software engineer based in Los Angeles. I made CastIt to streamline making decisions with my friends. I hope it makes picking where to eat or what movie to watch easier for you too.</p>
            </section>
        </div>
    )
}

export default AboutPage