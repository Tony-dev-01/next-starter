import avatar01 from '../../public/avatar01.png'
import avatar02 from '../../public/avatar02.png'
import Image from 'next/image'

export default function Testimonial () {

    const users = [
        {
            name: 'Random guy',
            role: 'Mobile Developer',
            comments: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.',
            profileImageUrl: avatar02 // Insert your image url or asset 
        },
        {
            name: 'Another one',
            role: 'Software Developer',
            comments: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.',
            profileImageUrl: avatar01 
        },
        {
            name: 'Some dev',
            role: 'Web Developer',
            comments: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. ',
            profileImageUrl: avatar01 
        },
        {
            name: 'Paul',
            role: 'Janitor',
            comments: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.',
            profileImageUrl: avatar02
        },
        {
            name: 'Michael',
            role: 'Taxi Driver',
            comments: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. ',
            profileImageUrl: avatar02
        },
        {
            name: 'Mike',
            role: 'Plumber',
            comments: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. ',
            profileImageUrl: avatar01
        },
    ]

    return(
        <section className="py-10 md:py-16 bg-base-200">
            <div className="container">
            <div className="py-8 md:py-12 px-8 max-w-7xl mx-auto">
                
                <h2 className="font-bold text-4xl mb-12 text-left ">Our users <span className="text-primary">love</span> it...</h2>
                
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8">
                    {users.map((user) => {
                        return (
                            <div className="block mb-8 lg:mb-10">
                                <div className="stack">
                                    <div className="card bg-base-100">
                                        <div className="card-body gap-4">
                                            <div className="flex items-start">
                                                <div className="avatar flex-shrink-0">
                                                    <div className="w-16 rounded-full border-2 border-white bg-primary">
                                                        {user.profileImageUrl && <Image src={user.profileImageUrl} alt='' />}
                                                        {/* Insert image here */}
                                                    </div>
                                                </div>
                                                <div className="ml-3 flex flex-col gap-2">
                                                    <div className="flex flex-col gap-0">
                                                        <p className="text-lg font-medium leading-tight">{user.name}</p>
                                                        <small className="text-gray-400">{user.role}</small>
                                                    </div>
                                                <p>{user.comments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
                </div>
            </div>
        </section>
    )
}