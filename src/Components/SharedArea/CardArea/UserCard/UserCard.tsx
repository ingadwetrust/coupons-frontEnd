import { Component } from "react";
import UserModel from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";
import "./UserCard.css";

interface UserCardState {
    user: UserModel;
	
}

class UserCard extends Component<{}, UserCardState> {

    public constructor (props: {}) {
        super(props);
        this.state = {user: null};
    }


public async componentWillMount() {
    try {

  const user = store.getState().AuthState.user;
  this.setState({user});
    }
    catch (err) {
        alert("Error: " +err.message);
    }
}


public render(): JSX.Element {
    return (
        <div className="UserCard">
			<div>
                

                {whatTimeIsIt()===1&& <span>Good Night <br/> {this.state.user.name}</span>}
                {whatTimeIsIt()===2&& <span>Good Morning <br/>{this.state.user.name}</span>}
                {whatTimeIsIt()===3&& <span>Good Afternoon <br/>{this.state.user.name}</span>}
                {whatTimeIsIt()===4&& <span>Good Evening<br/> {this.state.user.name}</span>}
                
            </div>
        </div>
    );
}
}

export default UserCard;

function whatTimeIsIt(): number {
    const now = new Date();
    let timeOfDay: number = now.getHours(); //
    switch (true) {
        case (timeOfDay<6):
            return 1
            break;
        case (timeOfDay<12):
            return 2
            break;
    
        case (timeOfDay<18):
            return 3
            break;
    
        case (timeOfDay<22):
            return 4
            break;

        default:
            return 1;
            break;
    }
}
