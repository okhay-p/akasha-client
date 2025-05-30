import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How does LearnAI generate personalized lessons?",
      answer:
        "LearnAI uses advanced machine learning algorithms to analyze your learning style, pace, and preferences. It then creates custom lessons that adapt to your unique needs, making learning more effective and engaging.",
    },
    {
      question: "What subjects can I learn with LearnAI?",
      answer:
        "You can learn virtually any subject with LearnAI, from mathematics and sciences to languages, humanities, arts, and professional skills. Our AI can generate lessons for any topic you're interested in.",
    },
    {
      question: "Do I need any special equipment or software?",
      answer:
        "No, LearnAI works on any modern web browser. You can access it from your computer, tablet, or smartphone without installing any additional software.",
    },
    {
      question: "Can I use LearnAI for my classroom or school?",
      answer:
        "Our Teams plan is designed specifically for educational institutions. Teachers can create custom lessons for their students, track progress, and provide personalized learning experiences at scale.",
    },
    {
      question: "How accurate is the content generated by LearnAI?",
      answer:
        "LearnAI is trained on a vast database of educational materials and is regularly updated with the latest information. However, we recommend verifying critical information from authoritative sources, especially for specialized or advanced topics.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged again.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about LearnAI? Find answers to common
            questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
