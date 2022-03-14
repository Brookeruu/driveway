import { ReactNode, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  href?: string;
  children: ReactNode;
};

const Button = ({ onClick, href, children, ...props }: Props) => {
  return (
    <>
      {href ? (
        <Link to={href} className={props.className}>{children}</Link>
      ) : (
        <button
          onClick={onClick}
          {...props}
          className={`primary ${props.className}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
