import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import { UserType } from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";
import jwtAxios from "../../../../Services/JwtAxios";
import "./CustomerCard.css";
interface RouteParams {
    id: string;
  }

interface CustomerCardProps extends RouteComponentProps<RouteParams> {}


interface CustomerCardState {
  customer: CustomerModel;
}

class CustomerCard extends Component<CustomerCardProps, CustomerCardState>{
    public constructor(props:CustomerCardProps){
        super(props);
        this.state = {customer: null}; 
    }
    
    public async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            let url = "";
            if (store.getState().AuthState.user.userType===UserType.CUSTOMER){
            url = "http://localhost:8080/customer/getCustomerDetails";
            }
            if (store.getState().AuthState.user.userType===UserType.ADMIN){
            url = "http://localhost:8080/admin/getOneCustomer?id="+id;
            }
      const response = await jwtAxios.get<CustomerModel>(url);
      this.setState({customer : response.data});
        }
        catch (err) {
            alert("Error: " +err.message);
        }
  }






public render(): JSX.Element {
    return (
        
        <div className="CompanyCard Box">
             {this.state.customer &&
             <>
        <h1>{this.state.customer.firstName+" "+this.state.customer.lastName}</h1>
        <h3>Email: {this.state.customer.email}</h3>
        <h3>Password: {this.state.customer.password}</h3>

        </>  }
        <span>

{store.getState().AuthState.user.userType===UserType.CUSTOMER && 
<NavLink style={{   fontSize:"small",
                   background:"black",
                   color: "antiquewhite"
                                }}
    className="box" to="/customer/CustomerCouponsTable">BACK TO MY COUPONS</NavLink>}
{store.getState().AuthState.user.userType===UserType.ADMIN && 
<NavLink style={{
                   fontSize:"small",
                   background:"black",
                   color: "antiquewhite"
                                }}
    className="box" to="/admin/customersTable">BACK TO ALL CUSTOMERS</NavLink>}

    </span>

        </div>
    );
}

}
export default CustomerCard;
