import { Component } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import Login from "../../AuthArea/Login/Login";

import "./Home.css";


interface HomeState{
    user: UserModel;
}

class Home extends Component<{},HomeState> {
    
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
        <div className="Home">
			{!this.state.user &&
                <Login/>}  
        </div>
    );
}
}

export default Home;
