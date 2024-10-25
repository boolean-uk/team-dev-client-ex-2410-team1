import { NavLink } from "react-router-dom";
import TickIcon from "../../assets/tickIcon";
import "./toast.css";

const Toast = ({ text = "", linkTo = "#nogo", linkText = "" }) => {
  return (
    <div className="toast bg-blue">
      <TickIcon height={40} width={40} />
      <p className="text-white text-large">{text}</p>
      <NavLink to={linkTo} className="text-green text-large">
        {linkText}
      </NavLink>
    </div>
  );
};

export default Toast;
