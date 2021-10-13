import { Link } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import "./CouponCard.css";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import jwtAxios from "../../../../Services/JwtAxios";
import store from "../../../../Redux/Store";
import { UserType } from "../../../../Models/UserModel";
import globals from "../../../../Services/Globals";
import notify from "../../../../Services/Notification";
import { Cancel } from "@material-ui/icons";
import UpdateCoupon from "../../../UserArea/CompanyArea/UpdateCoupon/UpdateCoupon";

interface RouteParams {
  id: string;
}

interface CouponCardProps extends RouteComponentProps<RouteParams> {}

interface CouponCardState {
  coupon: CouponModel;
  customerCoupons: CouponModel[];
  updateDialog: boolean;
  pic: string;
}

class CouponCard extends Component<CouponCardProps, CouponCardState> {
  public constructor(props: CouponCardProps) {
    super(props);
    this.state = {
      coupon: null,
      updateDialog: false,
      pic: null,
      customerCoupons: []
    };
  }

  public async componentDidMount() {
    try {
      {
        !store.getState().AuthState.user && this.props.history.push("/home");
      }
      const id = this.props.match.params.id;

      let url = "";
      if (store.getState().AuthState.user.userType === UserType.COMPANY) {
        url = globals.urls.getOneCouponCompany;
        const response = await jwtAxios.get<CouponModel>(url + id);
        this.setState({ coupon: response.data });
      }
      if (store.getState().AuthState.user.userType === UserType.CUSTOMER) {
        url = globals.urls.getOneCouponCustomer;
        const responseArray = await jwtAxios.get<CouponModel[]>(
          globals.urls.getCustomerCoupons
        );
        const response = await jwtAxios.get<CouponModel>(url + id);
        this.setState({
          coupon: response.data,
          customerCoupons: responseArray.data,
        });
      }

    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  public onBuy = async (coupon: CouponModel) => {
    try {

      const response = await jwtAxios.post<CouponModel>(
        globals.urls.purchaseCoupon,
        coupon
      );
      notify.success(
        "You successfully purchased " + this.state.coupon.title + " coupon"
      );
    } catch (err) {
      notify.error("You cannot buy a coupon you already have");
    }
  };

  public render(): JSX.Element {

    const handleOpenUpdateDialog = () => {
      this.setState({ updateDialog: true });
    };
    const handleCloseUpdateDialog = () => {
      this.setState({ updateDialog: false });
    };

    return (
      <div className="CouponCard Box">
        {this.state.coupon && (
          <>
            <h1>{this.state.coupon.title}</h1>
            <img
              style={{ width: 450, height: 300 }}
              src={globals.urls.getCouponImage + this.state.coupon.imageName}
            />
            <h3>Description: {this.state.coupon.description}</h3>
            <h3>Company: {this.state.coupon.company.name}</h3>
            <h3>Price: {this.state.coupon.price}</h3>
            {store.getState().AuthState.user.userType === UserType.COMPANY && (
              <h3>Amount: {this.state.coupon.amount}</h3>
            )}
            <h3>Coupon Start Date: {this.state.coupon.startDate}</h3>
            <h3>Coupon End Date: {this.state.coupon.endDate}</h3>
            <br />
            <br />
          </>
        )}


        <span className="buttons">
          {store.getState().AuthState.user.userType === UserType.CUSTOMER &&
            !this.state.customerCoupons.includes(this.state.coupon) && (
              <Button
                style={{
                  fontSize: "small",
                  background: "black",
                  color: "antiquewhite",
                }}
                className="box"
                onClick={() => this.onBuy(this.state.coupon)}
              >
                BUY THIS COUPON
              </Button>
            )}

          {store.getState().AuthState.user.userType === UserType.COMPANY && (
            <Button
              style={{
                fontSize: "small",
                background: "black",
                color: "antiquewhite",
              }}
              className="box"
              component={Link}
              to="/company/couponsTable"
              variant="contained"
              color="primary"
            >
              BACK
            </Button>
          )}
          <Dialog
            open={this.state.updateDialog === true}
            onClose={handleCloseUpdateDialog}
          >
            <IconButton onClick={handleCloseUpdateDialog}>
              <Cancel></Cancel>
            </IconButton>{" "}
            <UpdateCoupon
              couponToUpdate={this.state.coupon}
              onClose={handleCloseUpdateDialog}
            />
          </Dialog>

          {store.getState().AuthState.user.userType === UserType.COMPANY && (
            <Button
              className="couponUpdate"
              style={{ color: "antiquewhite", fontSize: "small" }}
              onClick={handleOpenUpdateDialog}
              startIcon={<FontAwesomeIcon icon={faEdit} />}
            >
              UPDATE COUPON
            </Button>
          )}

          {store.getState().AuthState.user.userType === UserType.CUSTOMER && (
            <Button
              style={{
                fontSize: "small",
                background: "black",
                color: "antiquewhite",
              }}
              className="box"
              component={Link}
              to="/customer/allCouponsTable"
              variant="contained"
              color="primary"
            >
              BACK TO ALL COUPONS
            </Button>
          )}
          
          {store.getState().AuthState.user.userType === UserType.CUSTOMER && (
            <Button
              style={{
                fontSize: "small",
                background: "black",
                color: "antiquewhite",
              }}
              className="box"
              component={Link}
              to="/customer/CustomerCouponsTable"
              variant="contained"
              color="primary"
            >
              BACK TO MY COUPONS
            </Button>
          )}
        </span>
      </div>
    );
  }
}

export default CouponCard;
