import image from '../../public/description.png';
import Image from 'next/image';

export default function Description () {
    return(
        <section className="py-10 md:py-16 bg-base-200">
            <div className="container">
            <div className="py-10 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col gap-4 text-center md:text-left basis-1/2 justify-center">
                        <h2 className="font-bold text-4xl">Become more efficient by delegating your workload</h2>
                        <p className='text-gray-400 '>We handle the hard work for you so you can focus on what matters the most.</p>
                </div>
                <div className="basis-1/2 flex flex-col gap-2 items-center">
                    <Image src={image} alt='' className='w-2/3'/>
                </div>
            </div>
        </div>
        </section>
    )
}