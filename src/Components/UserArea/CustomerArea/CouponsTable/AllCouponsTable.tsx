import { Button,  } from "@material-ui/core";
import MaterialTable from "material-table";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import {History} from "history";
import "./AllCouponsTable.css";
import store from "../../../../Redux/Store";
import { UserType } from "../../../../Models/UserModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface CouponsTableProps{
    history: History
}

interface CouponsState {
  coupons: CouponModel[];
  selectedRow: CouponModel;
}

class AllCouponsTable extends Component<CouponsTableProps, CouponsState> {
  public constructor(props: CouponsTableProps) {
    super(props);
    this.state = { coupons: [], selectedRow: null };
  }

  public async componentDidMount() {
    try {
        {store.getState().AuthState.user.userType!==UserType.CUSTOMER && this.props.history.push('/home')}
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getAllCoupons
      );
      this.setState({coupons: response.data})
    } catch (err) {
    this.setState({coupons: []})
    }
  }

  public onBuy = async (coupon: CouponModel) => {
    try {

      const response = await jwtAxios.post<CouponModel>(
        globals.urls.purchaseCoupon,
        coupon
      );
      notify.success(
        "You successfully purchased " + this.state.selectedRow.title + " coupon"
      );
    } catch (err) {
      notify.error(
        "You cannot buy a coupon you already have"
      );
    }
  };

  public render(): JSX.Element {
     
    return (
      <div className="AllCouponsSTable">
        <MaterialTable
          data={this.state.coupons.sort((a, b) => a.id - b.id)}
          onRowClick={(evt, row) => {
            this.setState({ selectedRow: row });
            console.log(this.state.selectedRow);
            {this.state.selectedRow===row&&this.setState({selectedRow: null})}
          }}
          options={{
            search: false,
            rowStyle: (rowData) => ({
              backgroundColor:
                this.state.selectedRow === rowData ? "#67aeae" : "#FFF",
            }),
          }}
     
          components={{
            Action: (props) => (
              <Button onClick={() => props.action.onClick()}>Buy</Button>
            ),
          }}
          title="Available Coupons"
          columns={[
            { title: "ID", field: "id" },
            { title: "Category", field: "category", width:"50%" },
            { title: "Company", field: "company.name" },
            { title: "Title", field: "title" , width: "60%"},
            { title: "Description", field: "description" },
            { title: "Price", field: "price" , width: "50%"},
            { title: "Start Date", field: "startDate", type: "date" },
            { title: "End Date", field: "endDate", type: "date" },
            { title: 'image', field: 'image', render: rowData => <img src={globals.urls.getCouponImage+rowData.imageName} style={{ width: 60,  }} /> ,
   
        },  
            
        
          ]}
        />
      
          {this.state.selectedRow && (
              <span
            className = "Box">
            

            <Button
            className="CouponButton"               
            onClick={() => this.onBuy(this.state.selectedRow)}
            startIcon={<FontAwesomeIcon icon={faShoppingCart}/>}>
            Buy Coupon
            </Button>
            </span>
          )}
        
        <span>
          
            {this.state.selectedRow && (
               <NavLink 
               className = "Coupons Box"
               to={"/couponCard/" + this.state.selectedRow.id}
               >
               <Button className="CouponButton"
               startIcon={<FontAwesomeIcon icon={faDotCircle}/>} >
                    Show Coupon
               </Button>
             </NavLink>
            )}
         
        </span>
      </div>
    );
  }
}

export default AllCouponsTable;
