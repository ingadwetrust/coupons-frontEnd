import * as React from 'react';
import CompanyModel from '../../../../Models/CompanyModel';
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import jwtAxios from '../../../../Services/JwtAxios';
import notify from '../../../../Services/Notification';
import { NavLink } from 'react-router-dom';
import "./CompaniesTable.css";
import globals from '../../../../Services/Globals';
import {History} from "history";

interface CompaniesTableProps{
    history: History;
}

interface CompaniesTableState{
    companies: CompanyModel[];
    selectedRow: CompanyModel;
}

class CompaniesTable extends React.Component<CompaniesTableProps, CompaniesTableState>{
    public constructor(props: CompaniesTableProps) {
        super(props);
        this.state = {companies: [], selectedRow: null
    };
}
   
    public async componentDidMount(){
        try{
            const response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
            this.setState({companies: response.data});
            
        }
        catch (err) {
            this.props.history.push("/home")  
        }
    }
     
    public onAdd = async (company:CompanyModel) => {
        try{
        
            const response = await jwtAxios.post<CompanyModel>(globals.urls.addCompany, company);
            const addedCompany = response.data;
            const companies = [...this.state.companies];
            companies.push(addedCompany);
            this.setState({companies});
            notify.success("Company "+company.name+" has been successfully added to the database")
            return addedCompany.id;
            
        }
        catch (err){
            notify.error("Error: "+err);
            
        }
        
    }
    
    public onEdit = async(companyNew:CompanyModel, companyOld:CompanyModel)  =>{
        try{
            const response = await jwtAxios.put<CompanyModel>(globals.urls.updateCompany, companyNew);
            const updatedCompany = response.data;
            const companies = [...this.state.companies];
            companies.splice(companies.indexOf(companyOld),1);
            companies.push(updatedCompany);
            this.setState({companies});
            notify.success("Company "+companyNew.name+" has been successfully updated")
            
            
        }
        catch (err){
            notify.error("Error: "+err);
            
        }
        
    }
    
    public async onDelete(company:CompanyModel) {
        try{
            const response = await jwtAxios.delete<CompanyModel>(globals.urls.deleteCompany+company.id);
            const companies = [...this.state.companies];
            companies.splice(companies.indexOf(company),1);
            notify.success("Company "+company.name+" has been successfully deleted from the database")
            this.setState({companies});
            
        }
        catch (err){
            notify.error("Error: "+err);
          
        }
        
    }

    public render(): JSX.Element {

        return (
            <div className="CompaniesTable">

          <MaterialTable 
          data={this.state.companies}
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
            localization={{body: {editRow:{deleteText:"Are you sure you want to this company from the database?"}}}}
            title="Companies"
            columns={[
                { title: 'ID', field: 'id'},
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' },
                { title: 'Password', field: 'password' },
                
            ]} 
            
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
            to={"/companyCard/" + this.state.selectedRow.id}>
           <Button className="CompanyButton">
                Show Company
           </Button>
         </NavLink>
        )}
      
    </span>
    </div>
        )
    }
}

export default CompaniesTable;
 