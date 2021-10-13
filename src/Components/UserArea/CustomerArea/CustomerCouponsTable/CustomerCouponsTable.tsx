import { Button, IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import {  faDotCircle, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {History} from "history";
import "./CustomerCouponsTable.css";
import { UserType } from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";


interface CouponsTableProps{
    history: History;
}

interface CouponsState {
    coupons: CouponModel[];
    selectedRow: CouponModel;
    anchorEl: any;
  }
  
  class CustomerCouponsTable extends Component<CouponsTableProps, CouponsState> {
    public constructor(props: CouponsTableProps) {
      super(props);
      this.state = { coupons: [], selectedRow: null, anchorEl: null };
    }
  
  public async componentDidMount() {
    try {
        {store.getState().AuthState.user.userType!==UserType.CUSTOMER && this.props.history.push('/home')}
      const response = await jwtAxios.get<CouponModel[]>(
          globals.urls.getCustomerCoupons
          );
          this.setState({coupons: response.data})
    } catch (err) {
            this.setState({coupons: []})
    }
  }

  

  public async getByCategory(category:string){
    try{
        const response = await jwtAxios.get<CouponModel[]>(globals.urls.getCustomerCouponsByCategory+category);
        this.setState({coupons: response.data})    }
    catch (err) {
        notify.error("You have no coupons of category "+category)
    }
}
public async getByMaxPrice(price:number){
    try{
        const response = await jwtAxios.get<CouponModel[]>(globals.urls.getCustomerCouponsByMaxPrice+price);
            this.setState({coupons: response.data})
    }
    catch (err) {
        notify.error("You have no coupons below max price of "+price)
    }
}




  public render(): JSX.Element {
    
    const categories = ["FOOD", "ELECTRICITY", "RESTAURANT", "VACATION", "LIFESTYLE_AND_HEALTH", "CULTURE_AND_ENTERTAINMENT","SPORTS", "GAMES", "SHOPPING"]
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({anchorEl:event.currentTarget});
      };
    
      const handleClose = () => {
        this.setState({anchorEl:null});
      };
    let price = 0;return (
        <div className="CustomerCouponsTable">

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
        
        title="My Coupons"
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
            <span>
                       <Button className="SelectCategory Box" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} 
                         startIcon={<FontAwesomeIcon icon={faTags}/>} > Show By Category
                       </Button>
                       <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={handleClose}
          
        >
          <MenuItem onClick={()=>this.componentDidMount()}>ALL</MenuItem>    
          {categories.map((option) => (
                            <MenuItem  onClick={()=>this.getByCategory(option)} key={option.toString()} value={option.valueOf()}>
                              {option.replaceAll("_", " ")}
                            </MenuItem>
                          ))}
         
        </Menu>
        
                </span>
      <span>
      <b>
        {this.state.selectedRow && (
            <NavLink
            className = "Box"
            to={"/couponCard/" + this.state.selectedRow.id}>
           <Button className="CouponButton"
           startIcon={<FontAwesomeIcon  icon={faDotCircle} />}>Show selected Coupon</Button>
         </NavLink>
        )}
      </b>
    </span>
        <br/>
          <span className="Textfield Box">
                <TextField
                style={{width:320}}
                className="InputFindPrice" 
                placeholder="FIND BY MAX PRICE" 
                onChange={((e)=>price=+e.target.value)} 
                InputProps={{endAdornment:<IconButton onClick={()=>this.getByMaxPrice(price)}><Search/></IconButton>}}
                >Price</TextField> 
        </span>
        </div>
      
    );
  }
}

export default CustomerCouponsTable;
