import { heading, intro } from "copy/landing";
import Logo from '../assets/logo.png';
import Button from './library/Button';
import "./Landing.css";

// import Form from './library/Form';

const Landing = () => {
  return (
    <div className="splash">
      <h1 className="heading">{heading}</h1>
      <div>
        <img className="image--landing" src={Logo} alt="" />
      </div>
      <h2 className="intro">{intro}</h2>
      <Button
        className="primary primary--link"
        href="/scheduler"
      >
        Get Started!
      </Button>
    </div>
  );
};

export default Landing;
