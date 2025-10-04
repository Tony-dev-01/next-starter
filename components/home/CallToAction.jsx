import Image from "next/image";
import avatar from '../../public/cta.png'

export default function CallToAction (){
    return (
        <section className="py-10 md:py-16">
            <div className="container">
                <div className="p-2">
                    <div className="bg-base-300 rounded-lg w-full h-full min-h-60 flex flex-col justify-center items-center py-8 px-10">
                        <div className='flex flex-col gap-2 items-center'>
                    <div className="avatar flex-shrink-0">
                    <div className="w-16 rounded-full border-2 border-white bg-primary">
                            <Image src={avatar} alt='' />
                        </div>
                        </div>
                        <h2 className="font-bold text-4xl mb-8 text-center ">Start <span className="text-primary">earning</span> your rewards today</h2>
                        </div>
                        <button className="btn btn-primary">Get started</button>
                    </div>
                </div>
            </div>
        </section>
    )
}