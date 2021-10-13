import {

    Button,
  Container,
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import {  Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import UserModel, { UserType } from "../../../Models/UserModel";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Login.css";

function Login(): JSX.Element {

  const history = useHistory(); // Redirect functions
  const { register, handleSubmit } = useForm<UserModel>(); // UserModel is what the server

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function send(user: UserModel) {
    let urlToConnect: string;
    switch (user.userType) {
      case "ADMIN":
        urlToConnect =
         globals.urls.loginAdmin +
          user.email +
          globals.urls.password+
          user.password;
        break;
      case "COMPANY":
        urlToConnect =
         globals.urls.loginCompany +
          user.email +
          globals.urls.password +
          user.password;
        break;
      case "CUSTOMER":
        urlToConnect =
         globals.urls.loginCustomer +
          user.email +
          globals.urls.password +
          user.password;
        break;
    }

    try {
      const response = await axios.post<UserModel>(urlToConnect, user); //UserModel is the type return back from the server
      store.dispatch(loginAction(response.data));
      {store.getState().AuthState.user.userType===UserType.ADMIN &&
          history.push("/admin/companiesTable"); // Redirect to home on success
        }
        {store.getState().AuthState.user.userType===UserType.COMPANY &&
            history.push("/company/couponsTable"); // Redirect to home on success
        }
        {store.getState().AuthState.user.userType===UserType.CUSTOMER &&
            history.push("/customer/CustomerCouponsTable"); // Redirect to home on success 
        }
        {store.getState().AuthState.user && notify.success("You are now logged in")}
        {!store.getState().AuthState.user && notify.error("Login failed: illegal credentials")}
  
    } catch (err) {
      notify.error("Login failed: "+err)
    }
  }
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#67aeae",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "white",
          },
        "& .MuiOutlinedInput-input": {
          color: "white",
          fontFamily: '"Mukta",sans-serif',
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "white",
          fontFamily: '"Mukta",sans-serif',
        },
        "& .MuiInputLabel-outlined": {
          color: "white",
          fontFamily: '"Mukta",sans-serif',
        },
      },
      select: {
        width: "40%",
        textAlign: "center",
        margin: theme.spacing(1),
        minWidth: 120,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#67aeae",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "white",
          },
        "& .MuiOutlinedInput-input": {
          color: "white",
          fontFamily: '"Mukta",sans-serif',
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "white",
          fontFamily: '"Mukta",sans-serif',
        },
        "& .MuiInputLabel-outlined": {
          color: "white",
          fontFamily: '"Mukta",sans-serif',
        },
      },
    })
  );
  const styleClasses = useStyles();

  const selectOptions = [
    { id: 1, label: "ADMIN", type: UserType.ADMIN },
    { id: 2, label: "COMPANY", type: UserType.COMPANY },
    { id: 3, label: "CUSTOMER", type: UserType.CUSTOMER },
  ];

  return (
    <div className="Login Box">
      <Container className="login-container">
        <Typography variant="h6">LOG IN</Typography>
        <form onSubmit={handleSubmit(send)}>
          <div className="email-container">

            <TextField
              label="Email"
              variant="outlined"
              className={`${styleClasses.root} TextBox`}
              inputRef={register({ required: true })}
              type="email"
              name="email"
            />
          </div>
          <div className="password-container">
              
            <TextField
              label="Password"
              variant="outlined"
              className={`${styleClasses.root} TextBox`}
              inputRef={register({ required: true })}
              type={!showPassword ? "password" : "text"}
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ color: "white" }}
                      onClick={handleClickShowPassword}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="user-type-container">
            <FormControl variant="outlined" className={styleClasses.select}>
              <InputLabel>User Type</InputLabel>
              <Select
                label="User Type"
                onChange={(e) =>
                  register({
                    required: true,
                    name: "userType",
                    value: e.target.value,
                  })
                }
              >
                {selectOptions.map((option) => (
                  <MenuItem key={option.id} value={option.type}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <br />
          <Button type='submit'>Enter</Button>
                </form>
      </Container>
    </div>
  );
}

export default Login;
