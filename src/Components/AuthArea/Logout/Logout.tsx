import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { logoutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import "./Logout.css"


function Logout(): JSX.Element {
    
    function logout(){
        notify.success("You are logged out of the Coupons System")
        store.dispatch(logoutAction());
        history.push("/home");
        
         
    }
    const history = useHistory();
    return <Button className= "Logout" endIcon={<FontAwesomeIcon icon={faSignOutAlt}/>} onClick={()=> logout() }>Logout</Button>;
}

export default Logout;
