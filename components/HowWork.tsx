'use client'
import React from 'react'
import {AnimatePresence, motion} from "framer-motion";
import {CanvasRevealEffect} from "@/components/ui/CanvasRevealEffect";

function HowWork() {
    return (
        <>
            <section className={'pt-20 w-full '} id={'how-it-works'} suppressHydrationWarning>
                <h1 className={'heading'}>
                    How it works {' '} <span className={'text-purple'}>{' '}works</span>
                </h1>
                <div
                    className="my-20 flex flex-col lg:flex-row items-center justify-center  gap-4 ">
                    <Card title="SING UP " icon={<AceternityIcon order={'Step 1'}/>}
                          description={' create an account with easy steps using any of the options'}
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-emerald-900"
                        />
                    </Card>
                    <Card title="GET STARTED" icon={<AceternityIcon order={'Step 2'}/>}
                          description={'Get Started with your learning path , and generate a course from scratch'}
                    >
                        <CanvasRevealEffect
                            animationSpeed={3}
                            containerClassName="bg-black"
                            colors={[
                                [236, 72, 153],
                                [232, 121, 249],
                            ]}
                            dotSize={2}
                        />
                        {/* Radial gradient for the cute fade */}
                        <div
                            className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black-100/90"/>
                    </Card>
                    <Card title="START LEARNING" icon={<AceternityIcon order={'Step 3'}/>}
                          description={'Start learning with the courses you have created , and share it with your friends'}>
                        <CanvasRevealEffect
                            animationSpeed={3}
                            containerClassName="bg-sky-600"
                            colors={[[125, 211, 252]]}
                        />
                    </Card>
                </div>
            </section>
        </>
    );
}

const Card = ({
                  title,
                  icon,
                  children,
                  description,
              }: {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    description?: string;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border group/canvas-card  flex items-center justify-center border-white/[0.2]  max-w-sm w-full mx-auto p-4 rounded-3xl  lg:h-[35rem] relative"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white/[0.3] font-bold "/>
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white/[0.3] font-bold  "/>
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white/[0.3] font-bold  "/>
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white/[0.3] font-bold  "/>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20">
                <div
                    className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
                    {icon}
                </div>
                <h2 className="text-white text-center text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10  mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                    {title}
                </h2>
                <h2 className=" text-white-200 text-center text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10  mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                    {description}
                </h2>
            </div>
        </div>
    );
};

const AceternityIcon = ({order}: { order: string }) => {
    return (
        <div className={'flex items-center justify-center '}>
            <button
                className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inline-flex h-14  animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-bold text-2xl text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                {order}
            </button>


        </div>
    );
};

export const Icon = ({className, ...rest}: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
        </svg>
    );
};


export default HowWork
