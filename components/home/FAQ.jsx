export default function FAQ () {
    const questions = [
        {
            id: 1,
            name: "How do I create an account?",
            content: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
        },
        {
            id: 2,
            name: "I forgot my password. What should I do?",
            content: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
        },
        {
            id: 3,
            name: "How do I update my profile information?",
            content: 'Go to "My Account" settings and select "Edit Profile" to make changes.'
        },
    ];

    return(
        <section className="py-10 md:py-16">
            <div className="container">
                <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col gap-2 text-left basis-1/2">
                        <h2 className="font-bold text-4xl text-left ">Frequently Asked Questions</h2>
                        <p className="text-gray-400 ">Contact us directly if you have additional questions.</p>
                    </div>
                    <ul className="basis-1/2 flex flex-col gap-2">
                        {questions.map((question, index) => {
                            return(
                                <div key={question.id} className="collapse collapse-plus bg-base-100 border border-base-300 has-[:checked]:bg-base-200 has-[:checked]:[&_.collapse-title]:text-primary">
                                    <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                                        <div className="collapse-title font-semibold">{question.name}</div>
                                        <div className="collapse-content text-sm">{question.content}</div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}