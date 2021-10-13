import * as React from 'react';
import { Button } from '@material-ui/core';
import CustomerModel from '../../../../Models/CustomerModel';
import MaterialTable from 'material-table';
import jwtAxios from '../../../../Services/JwtAxios';
import store from '../../../../Redux/Store';
import { UserType } from '../../../../Models/UserModel';
import notify from '../../../../Services/Notification';
import { NavLink } from 'react-router-dom';
import globals from '../../../../Services/Globals';
import {History} from "history";

interface CustomersTableProps{
    history: History;
}

interface CustomersState{
    customers: CustomerModel[];
    selectedRow: CustomerModel;
}

class CustomersTable extends React.Component<CustomersTableProps, CustomersState>{
    public constructor(props: CustomersTableProps) {
        super(props);
        this.state = {customers: [], selectedRow: null
    };
}
   
    public async componentDidMount(){
        try{ 
                const response = await jwtAxios.get<CustomerModel[]>(globals.urls.getAllCustomers); 
                this.setState({customers: response.data});
        }
        catch (err) {
            this.props.history.push("/home")        }
    }
    
    public onAdd = async (customer:CustomerModel) => {
        try{
            const response = await jwtAxios.post<CustomerModel>(globals.urls.addCustomer, customer);        
            const addedCustomer = response.data;
            const customers = [...this.state.customers];
            customers.push(addedCustomer);
            notify.success("Customer "+customer.firstName+" "+customer.lastName+ " has been successfully added to the database")
            this.setState({customers});    
        }
        catch (err){
            notify.error("Error: "+err)          
        }
        
    }
    
    public onEdit = async(customerNew:CustomerModel, customerOld: CustomerModel)  =>{
        try{
            const response = await jwtAxios.put<CustomerModel>(globals.urls.updateCustomer, customerNew);
            const updatedCustomer = response.data;
            const customers = [...this.state.customers];
            customers.splice(customers.indexOf(customerOld),1);
            customers.push(updatedCustomer);
            notify.success("Customer "+customerNew.firstName+" "+customerOld.lastName+ " has been successfully updated in the database")
            this.setState({customers});     
        }
        catch (err){
            notify.error("Error: "+err);   
        }      
    }
    
    public async onDelete(customer:CustomerModel) {
        try{
            const response = await jwtAxios.delete<CustomerModel>(globals.urls.deleteCustomer+customer.id);
            const deletedCustomer = response.data;
            const customers = [...this.state.customers];
            customers.splice(customers.indexOf(deletedCustomer),1);
            notify.success("Customer "+customer.firstName+" "+customer.lastName+ " has been successfully deleted from the database")
            this.setState({customers});   
        }
        catch (err){
            notify.error("Error: "+err);
        }
        
    }
    
    public render(): JSX.Element {

    {store.getState().AuthState.user.userType!==UserType.ADMIN&&
    this.props.history.push("/home")}

        return (
            <div className="CustomersTable">

          <MaterialTable
          onRowClick={(evt, row) => {
              this.setState({ selectedRow: row });
              {this.state.selectedRow===row&&this.setState({selectedRow: null})}
            }}
            options={{
                sorting: true,
                search: false,
                rowStyle: (rowData) => ({
                    backgroundColor:
                    this.state.selectedRow === rowData ? "#67aeae" : "#FFF",
                }),
            }}
            localization={{body: {editRow:{deleteText:"Are you sure you want to this customer from the database?"}}}}
            title="Customers"
            columns={[
                { title: 'ID', field: 'id' },
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Email', field: 'email' },
                { title: 'Password', field: 'password' },
                
            ]}
            
            data={this.state.customers.sort((a,b)=>a.id-b.id)}
            editable={{
                onRowAdd: newData =>
                new Promise<void>((resolve, reject) => {
                    this.onAdd(newData);
                    resolve();
                }),
                
                onRowUpdate: (newData, oldData) =>
                new Promise<void>((resolve, reject) => {
                    this.onEdit(newData, oldData);
                    resolve();  
                }),
                onRowDelete: oldData =>
                new Promise<void>((resolve, reject) => {
                    this.onDelete(oldData);
                    resolve();
                }),
            }}
            />
              <span>
      
      {this.state.selectedRow && (
          <NavLink
          className = "Box"
          to={"/customerCard/" + this.state.selectedRow.id}>
         <Button className="CustomerButton">
              Show Customer
         </Button>
       </NavLink>
      )}
    
  </span>
            </div>
        )
    }
}

  export default CustomersTable
 