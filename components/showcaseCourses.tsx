'use client'
import React, {useEffect, useState} from 'react'
import {people, projects} from "@/data";
import {PinContainer} from "@/components/ui/3DPin";
import {AnimatedTooltip} from "@/components/ui/AnimatedTooltip";
import {FaLocationArrow} from "react-icons/fa6";

function ShowcaseCourses() {
    const [isClient, setIsClient] = useState(false);
    const [withTech, setWithTech] = useState(false);
    useEffect(() => {

        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Or a loading spinner, etc.
    }
    const singlePerson = [{
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",


    }]


    return (
        <>
            <div className={'py-20 '} id={'showcase'} suppressHydrationWarning>
                <h1 className={'heading'}>
                    A small showcase of {' '} <span className={'text-purple'}>{' '}Courses</span>
                </h1>
                <div className={'flex flex-wrap items-center p-4 justify-center gap-x-24 gap-y-8 lg:gap-y-8 mt-10'}>
                    {projects.map(({id, title, des, img, iconLists, link}) => (
                        <div key={id}
                             className={' sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]  mb-10'}>
                            <PinContainer href={link} title={title}>
                                <div
                                    className={'relative flex items-center justify-center sm:w-[570px] w-[80vw] sm:h-[40vh] h-[30vh] overflow-hidden '}>
                                    <div
                                        className={'relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]'}>
                                        <img src={'/bg.png'} alt="bg-img"/>
                                    </div>
                                    <img src={img} alt={title} className={'z-10 absolute bottom-0 '}/>
                                </div>
                                <div className={'my-5'}>
                                    <h1 className={'font-bold  lg:text-2xl md:text-xl text-base line-clamp-1 '}>
                                        {title}
                                    </h1>
                                    <p className={'lg:text-xl lg:font-normal font-light text-sm line-clamp-2'}>
                                        {des}
                                    </p>
                                </div>
                                {/* tech  stack img*/}
                                {withTech && (
                                    <div className={'flex items-center justify-between mt-7 mb-3'}>
                                        <div className={'flex items-center '}>
                                            {iconLists.map((icon, idx) => (
                                                <div key={icon}
                                                     className={'border border-white/[0.2] rounded-full bg-black-100 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'}
                                                     style={{
                                                         transform: `translateX(-${5 * idx * 2}px`,
                                                     }}
                                                >
                                                    <img src={icon} alt={icon} className={'p-2'}/>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/*user img*/}
                                <div className={'flex items-center justify-between mt-7 mb-3'}>
                                    <div className={'flex items-center '}>
                                        <>
                                            <AnimatedTooltip items={singlePerson}/>
                                        </>
                                    </div>
                                    <div className={'flex justify-center items-center '}>
                                        <p className={'flex text-sm text-purple md:text-xs lg:text-xl'}>
                                            Start the Course
                                        </p>
                                        <FaLocationArrow className={'ms-3 '} color={'#CBACF9'}/>
                                    </div>

                                </div>


                            </PinContainer>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ShowcaseCourses
