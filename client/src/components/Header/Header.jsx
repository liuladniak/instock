import React from "react";
import "./Header.scss";
import InStockLogo from "../../assets/logo/InStock-Logo.svg";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to={"/"} className="header__logo-link">
          <img src={InStockLogo} alt="instock logo" />
        </Link>
      </div>
      <nav className="navigation">
        <NavLink to={"/"} className={"navigation__link"}>
          Warehouses
        </NavLink>
        <NavLink to={"/inventory"} className={"navigation__link"}>
          Inventory
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
