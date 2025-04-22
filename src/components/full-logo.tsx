import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

function FullLogo() {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} className="w-[48px] mr-1" alt="logo" />
        <p className="hidden md:block text-lg font-custom">
          AkashaLearn
        </p>
      </div>
    </Link>
  );
}

export default FullLogo;
