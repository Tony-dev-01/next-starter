

export default function Featured () {
    return(
        <section className="py-10 md:py-16">
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div>
                    <span className="text-gray-400">Trusted by many</span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1280px-Bell_logo.svg.png" alt="" loading="lazy" className="transition-all duration-500 filter grayscale hover:grayscale-0 w-auto h-[30px] sm:h-[35px]" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Product_Hunt_Logo.svg/2560px-Product_Hunt_Logo.svg.png" alt="" loading="lazy" className="transition-all duration-500 filter grayscale hover:grayscale-0 w-auto h-[30px] sm:h-[35px]" />
                        <img src="https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png" alt="" loading="lazy" className="transition-all duration-500 filter grayscale hover:grayscale-0 w-auto h-[30px] sm:h-[35px]" />
                        <img src="https://www.svgrepo.com/show/331488/mongodb.svg" alt="" loading="lazy" className="transition-all duration-500 filter grayscale hover:grayscale-0 w-auto h-[30px] sm:h-[35px]" />
                    </div>
                </div>
            </div>
        </section>
    )
};