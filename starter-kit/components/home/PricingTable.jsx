

export default function PricingTable () {
    const packages = [
        {
            name: "Starter kit",
            isMostPopular: false,
            isSubscription: true,
            price: 29,
            features: [
                {name: "High-resolution image generation", isIncluded: true},
                {name: "Customizable style templates", isIncluded: true},
                {name: "Batch processing capabilities", isIncluded: true},
                {name: "Seamless cloud integration", isIncluded: false},
                {name: "Real-time collaboration tools", isIncluded: false},
            ]
        },
        {
            name: "Pro kit",
            isMostPopular: true,
            isSubscription: false,
            price: 99,
            features: [
                {name: "High-resolution image generation", isIncluded: true},
                {name: "Customizable style templates", isIncluded: true},
                {name: "Batch processing capabilities", isIncluded: true},
                {name: "Seamless cloud integration", isIncluded: true},
                {name: "Real-time collaboration tools", isIncluded: true},
                {name: "Live chat", isIncluded: true},
            ]
        }
    ]

    return(
        <section className="py-10 md:py-16 bg-base-200">
            <div className="container flex flex-col justify-center items-center w-full py-8">
                <div className="flex flex-col items-center gap-3 mb-6">
                    <h2 className="font-bold text-4xl text-center">Don't worry, we got you <span className="text-primary">covered</span></h2>
                    <p className="text-gray-400 text-center">We have the perfect package for you.</p>
                </div>
            <div className="py-6 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
            {packages.map((pack) => {
                return (
                    <div className="card w-auto max-w-78 bg-base-100 shadow-sm">
                    <div className="card-body flex flex-col justify-between">
                        <div>
                        <div className="flex flex-col items-start justify-center gap-3">
                        <div className="flex flex-col items-start gap-1 ">
                            {pack.isMostPopular ?
                            <span className="badge badge-xs badge-warning">Most popular</span>: 
                            <span className="badge badge-xs">Get started</span>
                            }
                            <h3 className="text-3xl font-bold">{pack.name}</h3>
                        </div>
                        <span className="text-xl"><span className="font-bold text-4xl text-primary">${pack.price}</span><span className="text-sm">{pack.isSubscription ? '/mo' : ' one-time payment'}</span></span>
                        </div>
                        
                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                            {pack.features.map((feature) => {
                                return (
                                    <>
                                        {feature.isIncluded ?
                                        <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        <span>{feature.name}</span></li> :
                                        <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        <span className="line-through">{feature.name}</span></li>}
                                    </>
                                )
                            })}
                        </ul>
                        </div>
                        <div className="mt-6">
                        <button className="btn btn-primary btn-block">Subscribe</button>
                        </div>
                    </div>
                    </div>
                )
            })}
            </div>
            </div>
        </section>
    )
}