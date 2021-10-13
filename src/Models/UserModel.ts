class UserModel{
    
    public id: number;
    public email: string;
    public name: string;
    public password?: string;
    public token: string;
    public userType: UserType;
}

export default UserModel;


export enum UserType{
    ADMIN="ADMIN",
    COMPANY="COMPANY",
    CUSTOMER="CUSTOMER"
}