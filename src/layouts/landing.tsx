import logo from "@/assets/logo.svg";

import { ModeToggle } from "@/components/mode-toggle";

function Landing() {
  return (
    <>
      <ModeToggle />
      <img src={logo} className="logo" alt="logo" />
      <p className="text-4xl font-merriweather text-primary">AkashaLearn</p>
      <p className="font-merriweather-sans">This is a body text</p>
    </>
  );
}

export default Landing;
