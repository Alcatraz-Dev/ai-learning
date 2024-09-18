import Hero from "@/components/Hero";
import {HomeFloatingNav} from "@/components/ui/FloatingNav";
import Grid from "@/components/Grid";
import ShowcaseCourses from "@/components/showcaseCourses";
import Clients from "@/components/Clients";
import HowWork from "@/components/HowWork";
import Pricing from "@/components/pricing";


export default function Home() {
    return (

        <main suppressHydrationWarning id={'home'}
              className=" relative bg-black-100 flex  justify-center items-center
            flex-col overflow-clip mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <HomeFloatingNav/>
                <Hero/>
                <Grid/>
                <ShowcaseCourses/>
                <Clients/>
                <HowWork/>
                <Pricing/>
            </div>

        </main>

    );
}
