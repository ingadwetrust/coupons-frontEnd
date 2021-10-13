import { Component } from "react";
import UserModel, { UserType } from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AdminMenu from "../../MenuArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../MenuArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../MenuArea/CustomerMenu/CustomerMenu";
import "./Menu.css";


interface MenuState{
    user: UserModel;
}

class Menu extends Component<{},MenuState> {
    
    public componentDidMount(){
        store.subscribe(()=>
        this.setState({user: store.getState().AuthState.user}));
    }

    public constructor(props:{}){
        super(props);
        this.state= {
            user: null
        };
    }
    
 public render(): JSX.Element {

    return (
        <div className="Menu">
            {this.state.user && this.state.user.userType===UserType.ADMIN &&<AdminMenu/> }
            {this.state.user && this.state.user.userType===UserType.COMPANY && <CompanyMenu/> }
            {this.state.user && this.state.user.userType===UserType.CUSTOMER &&<CustomerMenu/> }
		
        </div>
    );
 }

}
export default Menu;
