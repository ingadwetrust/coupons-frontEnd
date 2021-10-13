import {faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";

import "./UpdateCoupon.css";

interface UpdateCouponProps {
  onClose: () => void;
  couponToUpdate: CouponModel
}
function UpdateCoupon(props: UpdateCouponProps): JSX.Element {
  const [couponId, setCouponId] = useState(props.couponToUpdate.id);
  const [couponTitle, setCouponTitle] = useState(props.couponToUpdate.title);
  const [couponDescription, setCouponDescription] = useState(props.couponToUpdate.description);
  const [couponAmount, setCouponAmount] = useState(props.couponToUpdate.amount);
  const [couponPrice, setCouponPrice] = useState(props.couponToUpdate.price);
  const [couponCompany, setCouponCompany] = useState(props.couponToUpdate.company);;
  const [couponCategory, setCouponCategory] = useState(props.couponToUpdate.category.toString());
  const [couponStartDate, setCouponStartDate] = useState(props.couponToUpdate.startDate.toString());;
  const [couponEndDate, setCouponEndDate] = useState(props.couponToUpdate.endDate.toString());;
  const [couponImageName, setCouponImageName] = useState("");;
  const [couponImage, setCouponImage] = useState(null);;

  const handleDisable = (): boolean => {
    if (
      !couponTitle ||
       !couponCategory ||
      couponStartDate > couponEndDate ||
      couponPrice === 0 ||
      couponAmount <= 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const { register, handleSubmit, errors } = useForm<CouponModel>();
  const history =useHistory();
  async function send(coupon: CouponModel) {
    try {
      const myCouponData = new FormData();
      myCouponData.append("id", props.couponToUpdate.id.toString());
      myCouponData.append("title", coupon.title);
      myCouponData.append("description", coupon.description);
      myCouponData.append("amount", coupon.amount.toString());
      myCouponData.append("price", coupon.price.toString());
      if (coupon.category!==undefined){
      myCouponData.append("category", coupon.category);
      }
      else {
          myCouponData.append("category", couponCategory)
      }
      myCouponData.append("startDate", coupon.startDate.toString());
      myCouponData.append("endDate", coupon.endDate.toString());
      if(couponImage!=null){
      myCouponData.append("image", coupon.image[0]);
      }
      const response = await jwtAxios.put<FormData>(
        globals.urls.updateCoupon,
        myCouponData
      );
      const updatedCoupon = response.data;
     

      notify.success(
        "Coupon with id "+props.couponToUpdate.id+" has been successfully updated in the database"
      );
      
      
    } catch (err) {
      notify.error("Error: " + err);
    }
  }

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

    const handleCategory = (event: ChangeEvent<HTMLInputElement>)=> {
        setCouponCategory(event.target.value)
    }
  return (
    <Container className="UpdateCoupon">
      <form onSubmit={handleSubmit(send)}>
        <Container className="data-fields">
          
            <h2>Update Coupon</h2>
            <h3>Coupon ID:{props.couponToUpdate.id}</h3>
            <img  className="Box" src={globals.urls.getCouponImage+props.couponToUpdate.imageName} style={{width: 250, height: 170}}/>
          <TextField
            className="textfield"
            variant="outlined"
            defaultValue={props.couponToUpdate.title}
            onChange={(e) =>
              register({
                type: "text",
                required: true,
                name: "title",
                value: setCouponTitle(e.target.value),
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon Title Required" },
              minLength: { value: 3, message: "Coupon Title too short" },
            })}
            name="title"
            label="Title"
          />
          <TextField
          className="textfield"
          variant="outlined"
          defaultValue={props.couponToUpdate.description}
            onChange={(e) =>
              register({
                type: "text",
                required: true,
                name: "description",
                value: setCouponDescription(e.target.value),
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon Description Required" },
            })}
            name="description"
            label="Description"
          />
          <br />
          <FormControl variant="outlined" className="textfield">
              <InputLabel>Category</InputLabel>
          <Select
           variant="outlined"
            defaultValue={props.couponToUpdate.category}
            onChange={(e) =>
              register({
                type: "text",
                required: true,
                name: "category",
                value:e.target.value
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon must have category" },
            })}
            name="category"
            label="Category"
            type="text"
          >
              {categories.map((option) =>(
               <MenuItem key ={option.toString()} value={option.valueOf()}>
                   {option.replaceAll("_", " ")}
                   </MenuItem>
              ))}
      
          </Select>
          </FormControl>
          <br />


          <TextField
          className="textfield"
        defaultValue={props.couponToUpdate.amount}
          variant="outlined"
            onChange={(e) =>
              register({
                type: "number",
                required: true,
                name: "amount",
                value: setCouponAmount(+e.target.value),
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon Amount Required" },
            })}
            name="amount"
            label="Amount"
            type="number"
          />

          <TextField
            className="textfield"
            variant="outlined"
        defaultValue={props.couponToUpdate.price}
            onChange={(e) =>
              register({
                type: "number",
                required: true,
                name: "price",
                value: setCouponPrice(+e.target.value),
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon Price Required" },
            })}
            name="price"
            type= "number"
            label="Coupon Price"
          />
    

          <TextField
           className="textfield"
           helperText="Coupon Start Date "
        defaultValue={props.couponToUpdate.startDate}
           variant="outlined"
          onChange={(e) =>
            register({
                type: "date",
                required: true,
                name: "startDate",
                value: setCouponStartDate(e.target.value),
            })
        }
        inputRef={register({
            required: { value: true, message: "Coupon Start Date Required" },
        })}
        name="startDate"
        
        type="date"
        />
          <TextField
          className="textfield"
          variant="outlined"
        defaultValue={props.couponToUpdate.endDate}
          helperText="Coupon end Date "
            onChange={(e) =>
              register({
                type: "date",
                required: true,
                name: "endDate",
                value: setCouponEndDate(e.target.value),
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon End Date Required" },
            })}
            name="endDate"
            type="date"
          />
    

              <TextField
          className="textfield"
          variant="outlined"
            onChange={(e) =>
              register({
                type: "file",
                required: false,
                name: "image",
                value: setCouponImage(e.target.value),
              })
            }
            inputRef={register({
              required: { value: false, message: "Coupon Image Required" },
            })}
            name="image"
            helperText="Coupon Image"
            type="file"
          />
        </Container>

        <Button
          onClick={props.onClose}
          disabled={handleDisable()}
          className="confirm-btn"
          type="submit"
          endIcon={<FontAwesomeIcon icon={faCheck} />}
        >
          Confirm
        </Button>
    
      </form>
    </Container>
  );
}

export default UpdateCoupon;
