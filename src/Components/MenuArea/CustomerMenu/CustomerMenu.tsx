import { Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import "./CustomerMenu.css";

export default function CustomerMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="CustomerMenu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        style={{
          color: "antiquewhite",
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <NavLink to="/customer/allCouponsTable">Purchase Coupons</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/customer/CustomerCouponsTable">My Coupons</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/customerCard/">My Details</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>{<Logout />}</MenuItem>
      </Menu>
    </div>
  );
}
