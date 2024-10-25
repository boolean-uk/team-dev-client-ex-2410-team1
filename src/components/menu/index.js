import "./menu.css";

const Menu = ({ children, className }) => {
  return (
    <div className={`menu ${className}`}>
      <ul>{children}</ul>
    </div>
  );
};

export default Menu;
