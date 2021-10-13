import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import { UserType } from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import "./CompanyCard.css";

interface RouteParams {
    id: string;
  }

interface CompanyCardProps extends RouteComponentProps<RouteParams> {}


interface CompanyCardState {
  company: CompanyModel;
}

class CompanyCard extends Component<CompanyCardProps, CompanyCardState>{
    public constructor(props:CompanyCardProps){
        super(props);
        this.state = {company: null}; 
    }
    
    public async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            let url = "";
            if (store.getState().AuthState.user.userType===UserType.COMPANY){
            url = globals.urls.getCompanyDetails;
            }
            if (store.getState().AuthState.user.userType===UserType.ADMIN){
            url = globals.urls.getOneCompany+id;
            }
      const response = await jwtAxios.get<CompanyModel>(url);
      this.setState({company : response.data});
      console.log(this.state);
        }
        catch (err) {
            alert("Error: " +err.message);
        }
  }






public render(): JSX.Element {
    return (
        
        <div className="CompanyCard Box">
             {this.state.company &&
             <>
        <h1>{this.state.company.name}</h1>
        <h3>Email: {this.state.company.email}</h3>
        <h3>Password: {this.state.company.password}</h3>

        </>  }
        <span>

{store.getState().AuthState.user.userType===UserType.COMPANY && 
<NavLink style={{   fontSize:"small",
                   background:"black",
                   color: "antiquewhite"
                                }}
    className="box" to="/company/couponsTable">BACK TO COUPONS TABLE</NavLink>}
{store.getState().AuthState.user.userType===UserType.ADMIN && 
<NavLink style={{
                   fontSize:"small",
                   background:"black",
                   color: "antiquewhite"
                                }}
    className="box" to="/admin/companiesTable">BACK TO ALL COMPANIES</NavLink>}

    </span>

        </div>
    );
}

}
export default CompanyCard;
