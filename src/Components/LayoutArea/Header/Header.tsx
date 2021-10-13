import { useEffect, useState } from "react";
import UserModel, { UserType } from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import Logo from "../../SharedArea/Logo/Logo";
import UserCard from "../../SharedArea/CardArea/UserCard/UserCard";

import "./Header.css";
import AdminMenu from "../../MenuArea/AdminMenu/AdminMenu";
import CustomerMenu from "../../MenuArea/CustomerMenu/CustomerMenu";
import CompanyMenu from "../../MenuArea/CompanyMenu/CompanyMenu";



function Header(): JSX.Element {
    
    const [user, setUser] = useState<UserModel>();  
    useEffect(()=> {
        store.subscribe(()=>
        setUser(store.getState().AuthState.user)
        );
    }, [])
    
  
        return (
            <div className="Header">
                <h1>COUPON MANAGER</h1>
                <h3>organize your coupons with world class efficiency
                    </h3>
                
                <span 
                className="UserCard">
                {user && <UserCard/>}
                </span> 

                    {<Logo/>}

                <span
                className="menu">
                  {user && user.userType===UserType.ADMIN && <AdminMenu/>}  
                  {user && user.userType===UserType.COMPANY && <CompanyMenu/>}  
                  {user && user.userType===UserType.CUSTOMER && <CustomerMenu/>}  
                </span>
                            
            </div>
        );
    } 

export default Header;
