import {
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Cancel, Search } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import { History } from "history";
import "./CouponsTable.css";
import AddCoupon from "../AddCoupon/AddCoupon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare, faDotCircle, faSync, faTags } from "@fortawesome/free-solid-svg-icons";
import store from "../../../../Redux/Store";
import { UserType } from "../../../../Models/UserModel";
import UpdateCoupon from "../UpdateCoupon/UpdateCoupon";
import { resolve } from "promise";

interface CouponsTableProps {
  history: History;

}

interface CouponsState {
  selectedRow: CouponModel;
  anchorEl: any;
  addDialog: boolean;
  updateDialog: boolean;
  coupons: CouponModel[];
}

class CouponsTable extends Component<CouponsTableProps, CouponsState> {
  public constructor(props: CouponsTableProps) {
     
    super(props);
    this.state = {
      selectedRow: null,
      anchorEl: null,
      addDialog: false,
      updateDialog: false, 
      coupons: [],
    };
  }

  public async componentDidMount() {
    this.getCompanyCoupons();
  }
 

  public async getCompanyCoupons() {
    try {
      {
        store.getState().AuthState.user.userType !== UserType.COMPANY &&
          this.props.history.push("/home");
      }
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCompanyCoupons
      );
      this.setState({ coupons: response.data });
    } catch (err) {
      this.setState({ coupons: [] });
    }
  }
  
  public async getByCategory(category: string) {
    try {
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCompanyCouponsByCategory + category
      );
      this.setState({ coupons: response.data });
    } catch (err) {
      notify.error("No coupons found with category " + category);
    }
  }
  public async getByMaxPrice(price: number) {
    try {
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCompanyCouponsByMaxPrice + price
      );
      this.setState({ coupons: response.data});
    } catch (err) {
      notify.error("No coupons found below max price of " + price);
    }
  }


  public async onDelete(coupon: CouponModel) {
    try {
      const response = await jwtAxios.delete<CouponModel>(
        globals.urls.deleteCoupon + coupon.id
      );
      const deletedCoupon = response.data;
      const couponsUpdated = [...this.state.coupons];
     couponsUpdated.splice(
          this.state.coupons.indexOf(deletedCoupon),
          1
        );
      this.setState({ coupons: couponsUpdated });
      notify.success(
        "Coupon with ID " +
          coupon.id +
          " has been successfully deleted from the database"
      );
    } catch (err) {
      notify.error("Error: " + err);
    }
  }

  public onShow = (coupon: CouponModel) => {
    <NavLink to={"/couponCard/" + coupon.id} exact></NavLink>;
    console.log(coupon);
  };

  tableRef = React.createRef();

  public render(): JSX.Element {
    const categories = [
      "FOOD",
      "ELECTRICITY",
      "RESTAURANT",
      "VACATION",
      "LIFESTYLE_AND_HEALTH",
      "CULTURE_AND_ENTERTAINMENT",
      "SPORTS",
      "GAMES",
      "SHOPPING",
    ];



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };
    let price = 0;
    const handleOpenAddDialog = () => {
      console.log(this);
    this.setState({ addDialog: true });

      
    };
    const handleCloseAddDialog = () => {
        // componentDidMount();
        this.setState({ addDialog: false });
    };
    const handleOpenUpdateDialog = () => {
        // componentDidMount();
        this.setState({ updateDialog: true });
    };
    const handleCloseUpdateDialog = () => {
        this.getCompanyCoupons();

      this.setState({ updateDialog: false });
    };

    return (
      <div className="CouponsTable">
   <Button
            className="Refresh Box"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={() => this.getCompanyCoupons()}
            startIcon={<FontAwesomeIcon  icon={faSync} />}
         >
            {" "}
            
            Refresh Table
          </Button>
        <Dialog
          open={this.state.addDialog === true}
          onClose={handleCloseAddDialog}
          >
          <IconButton onClick={handleCloseAddDialog}>
            <Cancel></Cancel>
          </IconButton>{" "}
          <AddCoupon  onClose={handleCloseAddDialog} />
        </Dialog>
        
        <Button
          className="AddCoupon Box"
          onClick={handleOpenAddDialog}
          style={{color: "antiquewhite" }}
          startIcon={<FontAwesomeIcon icon={faPlusSquare} />}
          >
          {" "}
         ADD A NEW COUPON
        </Button>

        <Dialog
          open={this.state.updateDialog === true}
          onClose={handleCloseUpdateDialog}
          >
          <IconButton onClick={handleCloseUpdateDialog}>
            <Cancel></Cancel>
          </IconButton>{" "}
          <UpdateCoupon
            couponToUpdate={this.state.selectedRow}
            onClose={handleCloseUpdateDialog}
            />
        </Dialog>
        {this.state.selectedRow && (
            <Button
            className="UpdateCoupon Box"
            style={{color: "antiquewhite"}}
            onClick={handleOpenUpdateDialog}
            startIcon={<FontAwesomeIcon  icon={faEdit} />}
            >
            {" "}
            UPDATE SELECTED COUPON
          </Button>
        )}

       
      

        <MaterialTable
          localization={{
            body: {
              editRow: {
                deleteText:
                  "Are you sure you want to this coupon from the database?",
              },
            },
          }}
          title="Coupons"
          columns={[
            { title: "ID", field: "id" },
            {
              title: "Category",
              field: "category",

              editComponent: (t) => (
                <Select
                  value={t.value}
                  onChange={(e) => {
                    t.onChange(e.target.value);
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.toString()} value={option.valueOf()}>
                      {option.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </Select>
              ),
            },
            { title: "Title", field: "title", width: "10%" },
            { title: "Description", field: "description" },
            { title: "Amount", field: "amount", type: "numeric" },
            { title: "Price", field: "price" },
            { title: "Start Date", field: "startDate", type: "date" },
            { title: "End Date", field: "endDate", type: "date" },
            {
              title: "Image",
              field: "image",
              render: (rowData) => (
                <img
                  src={globals.urls.getCouponImage + rowData.imageName}
                  style={{ width: 60 }}
                />
              ),

              editComponent: (t) => (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    name="image"
                    onChange={(e) => {
                      t.onChange(e.target.value);
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={this.state.coupons}
   
          onRowClick={(evt, row) => {
            this.setState({ selectedRow: row });
            console.log(this.state.selectedRow);
            {
              this.state.selectedRow === row &&
                this.setState({ selectedRow: null });
            }
          }}
          options={{
            search: false,
            rowStyle: (rowData) => ({
              backgroundColor:
                this.state.selectedRow === rowData ? "#67aeae" : "#FFF",
            }),
          }}
          editable={{
            onRowDelete: (oldData) =>
              new Promise<void>((resolve, reject) => {
                this.onDelete(oldData);
                resolve();
              }),
          }}
        />

        <span>
       
    

          <Button
            className="SelectCategory Box"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            startIcon={<FontAwesomeIcon icon={faTags}/>}
          >
            {" "}
            Show By Category
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={handleClose}
            
          >
            <MenuItem onClick={() => this.componentDidMount()}>ALL</MenuItem>
            {categories.map((option) => (
                      <MenuItem  onClick={()=>this.getByCategory(option)} key={option.toString()} value={option.valueOf()}>
                      {option.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
          </Menu>
        </span>
        
        <span>
          {this.state.selectedRow && (
            <NavLink
              className="Box"
              to={"/couponCard/" + this.state.selectedRow.id}
            >
              <Button className="CouponButton"
              startIcon={<FontAwesomeIcon  icon={faDotCircle} />}>Show selected Coupon</Button>
            </NavLink>
          )}
        </span>
        <br />
        <span className="Textfield Box">
          <TextField
            className="InputFindPrice"
            style={{ width: 320 }}
            placeholder="FIND BY MAX PRICE"
            onChange={(e) => (price = +e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => this.getByMaxPrice(price)}>
                  <Search />
                </IconButton>
              ),
            }}
          >
            Price
          </TextField>
        </span>
      </div>
    );
  }
}

export default CouponsTable;
