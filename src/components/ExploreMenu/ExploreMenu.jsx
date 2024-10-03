import React, { useEffect } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import HeaderCarosel from "../carosel/HeaderCarosel";

const ExploreMenu = ({ category, setCategory, menuItems }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      {menuItems && menuItems?.length > 0 && (
        <>
          <h1 className="text-3xl">Explore Our Menu</h1>
          <p className="explore-menu-text">
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <HeaderCarosel
            menuItems={menuItems}
            category={category}
            setCategory={setCategory}
          />
        </>
      )}{" "}
      <hr />
    </div>
  );
};

export default ExploreMenu;
