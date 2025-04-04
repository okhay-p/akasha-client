import { ModeToggle } from "@/components/mode-toggle";
import FullLogo from "@/components/full-logo";

function Header() {
  return (
    <div className="max-w-6xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 flex justify-between items-center p-2 border-b">
      <FullLogo />
      <ModeToggle />
    </div>
  );
}

export default Header;
