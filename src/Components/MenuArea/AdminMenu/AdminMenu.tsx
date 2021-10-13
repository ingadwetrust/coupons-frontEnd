import { Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import "./AdminMenu.css";

export default function AdminMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="AdminMenu">
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
          <NavLink to="/admin/companiesTable/">Companies</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span>
            <NavLink to="/admin/customersTable/">Customers</NavLink>
          </span>
        </MenuItem>
        <MenuItem onClick={handleClose}>{<Logout />}</MenuItem>
      </Menu>
    </div>
  );
}
