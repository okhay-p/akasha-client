import {
  Brain,
  BookOpen,
  Zap,
  Users,
  Clock,
  BarChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Learning",
      description:
        "Our advanced AI analyzes your learning style and creates personalized lessons just for you.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Any Subject, Any Level",
      description:
        "From math and science to languages and arts, learn anything at your own pace.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Feedback",
      description:
        "Get real-time feedback on your progress and adaptive lessons that evolve with you.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Collaborative Learning",
      description:
        "Share lessons with friends or classmates and learn together with AI guidance.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Learn on Your Schedule",
      description:
        "Access your personalized lessons anytime, anywhere, on any device.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Track Your Progress",
      description:
        "Visualize your learning journey with detailed analytics and insights.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supercharge Your Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform adapts to your unique learning
            style, making education more effective and enjoyable.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
