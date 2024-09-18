import React from 'react'
import {LampComponent} from "@/components/ui/lamp";
import {CardBody, CardContainer, CardItem} from "@/components/ui/3DCard";
import {FaCheck} from "react-icons/fa";
import {MovingBorderEffect} from "@/components/ui/MovingBorder";

function Pricing() {
    return (
        <section id={'pricing'} className={'pb-24'}>
            <LampComponent/>
            <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-60">
                <CardContainer className="inter-var ">

                    <CardBody
                        className=" bg-black-100 relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1]  border-white/[0.2]  w-full md:!w-[350px] h-auto rounded-xl p-6 border">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-white "
                        >
                            Hobby
                            <h2 className="text-6xl ">$0</h2>
                        </CardItem>
                        <CardItem
                            translateZ="60"
                            className=" text-sm max-w-sm mt-2 text-neutral-300"
                        >
                            Get a glimpse of what our software is capable of. Just a heads
                            up {"you'll"} never leave us after this!
                            <ul className="my-4 flex flex-col gap-2">
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    3 Free automations
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    100 tasks per month
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    Two-step Actions
                                </li>
                            </ul>
                        </CardItem>
                        <div className="flex justify-center items-center mt-8">
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 w-full rounded-xl text-xs font-normal text-white bg-black-100 border border-white/[0.2]"
                            >
                                Try now →
                            </CardItem>
                            {/*<CardItem*/}
                            {/*    translateZ={20}*/}
                            {/*    as="button"*/}
                            {/*    className="px-4 py-2 rounded-xl text-xs font-normal text-white bg-black-100 border border-white/[0.2]"*/}
                            {/*>*/}
                            {/*    Get Started Now*/}
                            {/*</CardItem>*/}
                        </div>
                    </CardBody>

                </CardContainer>
                <CardContainer className="inter-var ">
                    <CardBody
                        className=" bg-black-100 relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1]  border-white/[0.2]  w-full md:!w-[350px] h-auto rounded-xl p-6 border">

                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold  text-white "
                        >
                            Pro Plan
                            <h2 className="text-6xl ">$29</h2>
                        </CardItem>
                        <CardItem
                            translateZ="60"
                            className=" text-sm max-w-sm mt-2 text-neutral-300"
                        >
                            Get a glimpse of what our software is capable of. Just a heads
                            up {"you'll"} never leave us after this!
                            <ul className="my-4 flex flex-col gap-2">
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>3 Free automations
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    100 tasks per month
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    Two-step Actions
                                </li>
                            </ul>
                        </CardItem>
                        <div className="flex justify-center items-center mt-8">
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 w-full rounded-xl text-xs font-normal text-white bg-black-100 border border-white/[0.2]"
                            >
                                Try now →
                            </CardItem>
                            {/*<CardItem*/}
                            {/*    translateZ={20}*/}
                            {/*    as="button"*/}
                            {/*    className="px-4 py-2 rounded-xl text-xs font-normal text-white bg-black-100 border border-white/[0.2]"*/}
                            {/*>*/}
                            {/*    Get Started Now*/}
                            {/*</CardItem>*/}
                        </div>
                    </CardBody>
                </CardContainer>
                <CardContainer className="inter-var ">
                    <CardBody
                        className=" bg-black-100 relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1]  border-white/[0.2]  w-full md:!w-[350px] h-auto rounded-xl p-6 border">

                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-white "
                        >
                            Unlimited
                            <h2 className="text-6xl ">$99</h2>
                        </CardItem>
                        <CardItem
                            translateZ="60"
                            className=" text-sm max-w-sm mt-2 text-neutral-300"
                        >
                            Get a glimpse of what our software is capable of. Just a heads
                            up {"you'll"} never leave us after this!
                            <ul className="my-4 flex flex-col gap-2">
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>3 Free automations
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    100 tasks per month
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck color={'green'}/>
                                    Two-step Actions
                                </li>
                            </ul>
                        </CardItem>
                        <div className="flex text-center items-center mt-8">

                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 w-full rounded-xl text-xs font-normal text-white bg-black-100 border border-white/[0.2]"
                            >
                                Try now →
                            </CardItem>
                            {/*<CardItem*/}
                            {/*    translateZ={20}*/}
                            {/*    as="button"*/}
                            {/*    className="px-4 py-2 rounded-xl text-xs font-normal text-white bg-black-100 border border-white/[0.2]"*/}
                            {/*>*/}
                            {/*    Get Started Now*/}
                            {/*</CardItem>*/}
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
        </section>
    )
}

export default Pricing
