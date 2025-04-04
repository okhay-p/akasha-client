import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function GenerateLessons() {
  return (
    <>
      <Header />
      <div className="p-2 flex mx-auto items-center flex-col max-w-lg m-24">
        <p className="text-h1">Paste your text content here.</p>
        <p className="text-body mb-2">
          ✨ And AI will magically generate lessons for you ✨
        </p>
        <Textarea
          className="mb-2"
          rows={12}
          placeholder="Your content"
        />
        <Button className="w-48 shadow-lg shadow-primary/50">
          Generate
        </Button>
      </div>
    </>
  );
}

export default GenerateLessons;
