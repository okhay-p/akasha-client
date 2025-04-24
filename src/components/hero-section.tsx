import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import googleLogo from "@/assets/google-logo.svg";
import preview1 from "@/assets/preview1.png";

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Learn Anything with AI-Powered Personalized Lessons
          </h1>
          <p className="text-lg text-muted-foreground">
            AkashaLearn generates custom lessons tailored to your
            interests, learning style, and pace. Master any subject with
            personalized AI guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">
                Get Started With{" "}
                <img
                  src={googleLogo}
                  className="size-7 -ml-1"
                  alt="Google"
                />{" "}
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <Link to="#how-it-works">See How It Works</Link>
            </Button> */}
          </div>
          {/* <div className="pt-4 text-sm text-muted-foreground">
            No credit card required • Free 7-day trial
          </div> */}
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <img
            src={preview1}
            alt="AI Learning Platform Interface"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
