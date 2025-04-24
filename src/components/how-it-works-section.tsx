import { Check } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Tell us what you want to learn",
      description:
        "Enter any topic or subject you're interested in learning about.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Any subject or topic",
        "Any difficulty level",
        "Specific learning goals",
      ],
    },
    {
      number: "02",
      title: "AI generates personalized lessons",
      description:
        "Our AI creates custom lessons tailored to your learning style and pace.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Interactive content",
        "Multimedia resources",
        "Adaptive difficulty",
      ],
    },
    {
      number: "03",
      title: "Learn and get real-time feedback",
      description:
        "Practice with exercises and quizzes while receiving instant AI feedback.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Instant corrections",
        "Progress tracking",
        "Personalized tips",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How LearnAI Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform the way you learn with our
            AI-powered platform.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div
                className={`space-y-6 ${index % 2 !== 0 ? "md:order-2" : ""}`}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                  Step {step.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg ${index % 2 !== 0 ? "md:order-1" : ""}`}
              >
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={`Step ${step.number}: ${step.title}`}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
