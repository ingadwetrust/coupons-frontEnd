import { faCheck } from "@fortawesome/free-solid-svg-icons";
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
import CompanyModel from "../../../../Models/CompanyModel";
import CouponModel from "../../../../Models/CouponModel";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";

import "./AddCoupon.css";

interface AddCouponProps {
  onClose: () => void;
}
function AddCoupon(props: AddCouponProps): JSX.Element {
  const [couponTitle, setCouponTitle] = useState("");
  const [couponDescription, setCouponDescription] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  const [couponCompany, setCouponCompany] = useState<CompanyModel>(null);
  const [couponCategory, setCouponCategory] = useState("");
  const [couponStartDate, setCouponStartDate] = useState("");
  const [couponEndDate, setCouponEndDate] = useState("");
  const [couponImageName, setCouponImageName] = useState("");
  const [couponImage, setCouponImage] = useState(null);

  const handleDisable = (): boolean => {
    if (
      !couponTitle ||
      couponStartDate > couponEndDate ||
      couponPrice === 0 ||
      couponAmount <= 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const { register, handleSubmit } = useForm<CouponModel>();

  async function send(coupon: CouponModel) {
    try {
      const myCouponData = new FormData();
      myCouponData.append("title", coupon.title);
      myCouponData.append("description", coupon.description);
      myCouponData.append("amount", coupon.amount.toString());
      myCouponData.append("price", coupon.price.toString());
      myCouponData.append("category", coupon.category);
      myCouponData.append("startDate", coupon.startDate.toString());
      myCouponData.append("endDate", coupon.endDate.toString());
      myCouponData.append("image", coupon.image[0]);
      const response = await jwtAxios.post<FormData>(
        globals.urls.addCoupon,
        myCouponData
      );     
      notify.success(
        "New coupon has been successfully added to the database"
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
    <Container className="AddCoupon">
      <form onSubmit={handleSubmit(send)}>
        <Container className="data-fields">
          
            <h2>Add Coupon</h2>
          <TextField
            className="textfield"
            variant="outlined"
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
            onChange={(e) =>
              register({
                type: "text",
               
                name: "category",
                value:e.target.value
              })
            }
         
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
                required: true,
                name: "image",
                value: setCouponImage(e.target.value),
              })
            }
            inputRef={register({
              required: { value: true, message: "Coupon Image Required" },
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

export default AddCoupon;

