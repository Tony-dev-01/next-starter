import Image from 'next/image';
import heroImg from '../../public/hero.png';


export default function Hero (){
    return(
        <section className='bg-base-200 '>
            <div className="container">
        <div className="hero lg:h-fit xs:h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse justify-around w-full gap-10 lg:gap-0 py-10 xs:px-0">
                <Image
                src={heroImg}
                alt='decorative'
                className="max-w-xs rounded-lg"
                priority
                />
                <div className="flex flex-row justify-center text-center">
                    <div className='w-full'>
                <h1 className="text-5xl font-bold text-center lg:text-left">An app made for developers, by developers.</h1>
                <div className='flex w-full justify-center lg:justify-start xl:justify-start'>
                <p className="py-6 text-center lg:text-left max-w-[550px]">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                </div>
                <div className="flex justify-center lg:justify-start gap-3">
                    <button className="btn btn-primary ">Get Started</button>
                    <button className="btn btn-ghost ">Learn More</button>
                </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            </section>
    )
}