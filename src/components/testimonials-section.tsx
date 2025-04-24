import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      content:
        "LearnAI has completely transformed how I study. The personalized lessons are exactly what I needed to finally understand calculus.",
      author: "Sarah Johnson",
      role: "College Student",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      content:
        "As a teacher, I use LearnAI to create supplemental materials for my students. It's like having a teaching assistant that works 24/7.",
      author: "Michael Chen",
      role: "High School Teacher",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      content:
        "I've tried many learning platforms, but none adapt to my needs like LearnAI. It's like having a personal tutor that knows exactly how I learn.",
      author: "Emma Rodriguez",
      role: "Professional",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed
            their education with LearnAI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-lg mb-6">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t border-border pt-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
