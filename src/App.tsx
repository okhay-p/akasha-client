import logo from "./assets/logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <img src={logo} className="logo" alt="logo" />
      <p className="text-4xl font-merriweather text-primary">AkashaLearn</p>
      <p className="font-merriweather-sans">This is a body text</p>
    </>
  );
}

export default App;
