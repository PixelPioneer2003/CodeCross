import {
    Users,
    Clock,
    CheckCircle2,
    ListOrdered,
    Rocket,
} from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: <Users size={28} className="text-yellow-400" />,
            title: "Battle with Friends",
            desc: "Instantly challenge a friend to a coding duel by entering their username.",
        },
        {
            icon: <Clock size={28} className="text-yellow-400" />,
            title: "Fair Timed Matches",
            desc: "The timer kicks off only once both players receive the problem, ensuring fairness.",
        },
        {
            icon: <CheckCircle2 size={28} className="text-yellow-400" />,
            title: "Automatic Winner Detection",
            desc: "Integrated with the Codeforces API to announce results from real submissions in real time.",
        },
        {
            icon: <ListOrdered size={28} className="text-yellow-400" />,
            title: "Track Your Duels",
            desc: "Access previous match records and outcomes anytime on your profile.",
        },
        {
            icon: <Rocket size={28} className="text-yellow-400" />,
            title: "Sharpen Problem-Solving",
            desc: "Improve speed and accuracy by practicing under real competition pressure.",
        },
    ];

    return (
        <section className="bg-gray text-white py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-4 text-primary">
                    What's Inside?
                </h2>
                <p className="text-gray-300 mb-10 text-xl">
                    Everything you need to turn problem-solving into an adrenaline sport.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="relative bg-card pt-10 pb-6 rounded-xl shadow hover:shadow-xl transition hover:shadow-gray-700"
                        >
                            <span className="absolute left-[5%] top-[7%]">{feature.icon}</span>
                            <h3 className="px-12 text-3xl font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-md w-3/4 mx-auto mt-3">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
