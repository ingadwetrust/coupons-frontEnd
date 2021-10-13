import { Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import "./CompanyMenu.css";

export default function CompanyMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="CompanyMenu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <NavLink to="/company/couponsTable/">Coupons</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/companyCard">Company Details</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>{<Logout />}</MenuItem>
      </Menu>
    </div>
  );
}
