import CompanyModel from "./CompanyModel";

class CouponModel{
    
    public id: number;
    public company: CompanyModel;
    public title: string;
    public description: string;
    public category: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public imageName: string;
    public image: FileList;
}

export default CouponModel;