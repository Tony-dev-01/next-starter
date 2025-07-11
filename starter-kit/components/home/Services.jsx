'use client'

import { useState, useEffect } from "react";
import service01 from '../../public/service01.png'
import service02 from '../../public/service02.png'
import service03 from '../../public/service03.png'
import Image from "next/image";

export default function Services () {
    const [activeService, setActiveService] = useState(0); // the id of highlighted service
    const [fadeState, setFadeState] = useState('visible'); // 'visible' or 'hidden'
    const [displayedImageUrl, setDisplayedImageUrl] = useState(null);

    const serviceItems = [
        {
            id: 0,
            title: "Create unlimited accounts",
            content: "No limits, create as many accounts as you want.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
            imageUrl: service01 // insert your CDN URL to your image
            },
            {
            id: 1,
            title: "Free memberships",
            content: "Free memberships for your family and friends.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            ),
            imageUrl: service02 // insert your CDN URL to your image
            },
            {
                id: 2,
                title: "Collaborate with your colleagues",
                content: "Free memberships for your family and friends.",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                ),
                imageUrl: service03 // insert your CDN URL to your image
            }
    ];

    // Handle image transition when activeService changes
    useEffect(() => {
        if (displayedImageUrl !== serviceItems[activeService].imageUrl) {
            // Start fade out
            setFadeState('hidden');
            
            // After fade out completes, change the image and fade in
            const timer = setTimeout(() => {
                setDisplayedImageUrl(serviceItems[activeService].imageUrl);
                setFadeState('visible');
            }, 300); // This should match the CSS transition duration
            
            return () => clearTimeout(timer);
        }
    }, [activeService, displayedImageUrl]);

    const handleServiceChange = (itemId) => {
        setActiveService(itemId);
    };


    return(
        <section className="py-10 md:py-16">
            <div className="container">
                <div className="flex flex-col gap-8">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-4xl text-center">A boost of productivity at the tip of your finger</h2>
                    <p className="text-gray-400 text-center">This is the perfect application for you.</p>
                </div>
                <div className="flex gap-10 flex-wrap flex-row justify-evenly w-full">
                <div className={` flex flex-wrap justify-center transition-opacity duration-300 ${fadeState === 'visible' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-72 min-w-72 flex justify-center items-center">
                        <Image src={displayedImageUrl} alt={`Service ${activeService + 1}`} className="h-full max-w-sm w-auto"/>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-0 flex-wrap">
                            {serviceItems.map((item, index) => (
                                <div 
                                key={item.id}
                                className={`collapse bg-base-100 p-2 transition-colors duration-300 ${activeService === item.id ? 'bg-base-200 rounded-lg' : ''}`}
                                >
                                <input 
                                    type="radio" 
                                    name="my-accordion-1" 
                                    defaultChecked={item.id === 0}
                                    onChange={() => handleServiceChange(item.id)}
                                    className="cursor-pointer"
                                />
                                <div className={`collapse-title font-semibold flex flex-row gap-3 ${activeService === item.id ? 'text-primary' : ''}`}>
                                <i className={activeService === item.id ? 'text-primary' : ''}>
                                    {item.icon}
                                </i>
                                {item.title}
                                </div>
                                <div className="collapse-content text-md">
                                {item.content}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}