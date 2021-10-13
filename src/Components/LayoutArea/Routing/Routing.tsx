import { Redirect, Route, Switch } from "react-router";
import CompaniesTable from "../../UserArea/AdminArea/CompaniesTable/CompaniesTable";
import CustomersTable from "../../UserArea/AdminArea/CustomersTable/CustomersTable";


import Home from "../../HomeArea/Home/Home";
import AdminMenu from "../../MenuArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../MenuArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../MenuArea/CustomerMenu/CustomerMenu";
import Page404 from "../../SharedArea/Page404/Page404";
import CouponsTable from "../../UserArea/CompanyArea/CouponsTable/CouponsTable";
import AllCouponsTable from "../../UserArea/CustomerArea/CouponsTable/AllCouponsTable";
import CustomerCouponsTable from "../../UserArea/CustomerArea/CustomerCouponsTable/CustomerCouponsTable";
import CouponCard from "../../SharedArea/CardArea/CouponCard/CouponCard";
import CompanyCard from "../../SharedArea/CardArea/CompanyCard/CompanyCard";
import CustomerCard from "../../SharedArea/CardArea/CustomerCard/CustomerCard";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			 <Switch>
               <Route path="/home" component={Home} exact/>     
               <Route path="/admin/menu" component={AdminMenu} exact/>
               <Route path="/admin/companiesTable" component={CompaniesTable} exact/>
               <Route path="/admin/customersTable" component={CustomersTable} exact/>
               <Route path="/company/menu" component={CompanyMenu} exact/>
               <Route path="/customer/menu" component={CustomerMenu} exact/>
               <Route path="/company/couponsTable" component={CouponsTable} exact/>
               <Route path="/customer/allCouponsTable" component={AllCouponsTable} exact/>
               <Route path="/customer/CustomerCouponsTable" component={CustomerCouponsTable} exact/>
               <Route path="/couponCard/:id" component={CouponCard} exact/>
               <Route path="/companyCard/" component={CompanyCard} exact/>
               <Route path="/companyCard/:id" component={CompanyCard} exact/>
               <Route path="/customerCard/" component={CustomerCard} exact/>
               <Route path="/customerCard/:id" component={CustomerCard} exact/>
           
 


               <Redirect from="/" to="/home" exact/>
               <Route component = {Page404} />

           </Switch>
        </div>
    );
}

export default Routing;
