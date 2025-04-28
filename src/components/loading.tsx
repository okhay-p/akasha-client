import logo from "@/assets/logo.svg";

function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-background font-custom">
      <div>
        <img
          className="size-16 animate-bounce mx-auto"
          src={logo}
          alt="AkashaLearn"
        />
        <p className="text-center">
          🤚 Hold up 🤚 <br />
          We're setting things up
        </p>
      </div>
    </div>
  );
}

export default Loading;
