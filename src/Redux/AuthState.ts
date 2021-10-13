//Handling Products AppState

import UserModel from "../Models/UserModel";




// Products AppState - המידע ברמת האפליקציה הקשור למוצרים - אלו בעצם כל המוצרים
export class AuthState{ 
    public user: UserModel = new UserModel ();


}

//------------------------------------------------------------------

//Products Action Types - אלו פעולות ניתן לבצע על המידע ברמת האפליקציה

export enum AuthActionType{
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"

}
//------------------------------------------------------------------

//Products Action  - אובייקט המכיל את המידע עבור הפעולה שאני מבצעים על המידע
export interface AuthAction{
    type: AuthActionType;
    payload?: any;
}


//------------------------------------------------------------------

// Products Action Creators - פונקציות המקבלות את ה פיילוד ומחירות אובייקט אקשן מתאים עבור כל פעולה


export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.LOGIN, payload: user };
}
    
export function logoutAction(): AuthAction {
    return { type: AuthActionType.LOGOUT };
}


//------------------------------------------------------------------

//Products Reducer - פונקציה המבצעת את הפעולה בפועל
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
 const newState = {...currentState}; // Spread Operator
 switch (action.type) {

    case AuthActionType.LOGIN: // Here the payload is the logged in user sent from the server
        newState.user = action.payload;
        // localStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the local storage (won't be deleted)
        sessionStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the session storage (will be deleted when browser is closed)
        console.log(action.payload);
        break;
    case AuthActionType.LOGOUT: // Here we don't have payload!
        newState.user = null;
        localStorage.removeItem("user"); // clear user from the local storage.
        break;
}

return newState;
}

