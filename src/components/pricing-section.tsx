import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for casual learners",
      features: [
        "5 AI-generated lessons per month",
        "Basic progress tracking",
        "Text-based lessons",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Ideal for dedicated students",
      features: [
        "Unlimited AI-generated lessons",
        "Advanced progress analytics",
        "Multimedia lessons (text, audio, visual)",
        "Practice exercises with feedback",
        "Priority support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Teams",
      price: "$49",
      description: "For classrooms and study groups",
      features: [
        "Everything in Pro plan",
        "Up to 10 user accounts",
        "Collaborative learning features",
        "Teacher/admin dashboard",
        "Custom lesson templates",
        "24/7 dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning needs. All plans
            include a 7-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border ${plan.popular ? "border-primary shadow-lg relative" : "border-border"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2"
                    >
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/signup">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
