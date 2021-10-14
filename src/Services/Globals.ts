// Global settings which are the same for development and production
class Globals {

}   

// Global settings which are suitable only for development:
class DevelopmentGoals extends Globals{
    public urls = {
        loginAdmin: "http://localhost:8080/admin/login?email=",
        loginCompany: "http://localhost:8080/company/login?email=",
        loginCustomer: "http://localhost:8080/customer/login?email=",
        password: "&password=",
        getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
        addCompany: "http://localhost:8080/admin/addCompany",
        updateCompany: "http://localhost:8080/admin/updateCompany",
        deleteCompany: "http://localhost:8080/admin/deleteCompany?id=",
        getAllCustomers: "http://localhost:8080/admin/getAllCustomers",
        addCustomer: "http://localhost:8080/admin/addCustomer",
        updateCustomer: "http://localhost:8080/admin/updateCustomer",
        deleteCustomer: "http://localhost:8080/admin/deleteCustomer?id=",
        getCompanyCoupons: "http://localhost:8080/company/getCompanyCoupons",
        getCompanyCouponsByCategory: "http://localhost:8080/company/getCompanyCouponsByCategory?category=",
        getCompanyCouponsByMaxPrice: "http://localhost:8080/company/getCompanyCouponsByPrice?maxPrice=",
        addCoupon: "http://localhost:8080/company/addCoupon",
        updateCoupon: "http://localhost:8080/company/updateCoupon",
        deleteCoupon: "http://localhost:8080/company/deleteCoupon?id=",
        getAllCoupons:  "http://localhost:8080/customer/getAllCoupons",
        purchaseCoupon: "http://localhost:8080/customer/purchaseCoupon",
        getCustomerCoupons:"http://localhost:8080/customer/getCustomerCoupons",
        getCustomerCouponsByCategory:"http://localhost:8080/customer/getCustomerCouponsByCategory?category=",
        getCustomerCouponsByMaxPrice:"http://localhost:8080/customer/getCustomerCouponsByPrice?maxPrice=",
        getCompanyDetails: "http://localhost:8080/company/getCompanyDetails",
        getOneCompany: "http://localhost:8080/admin/getOneCompany?id=",
        getOneCouponCompany: "http://localhost:8080/company/getOneCoupon/",
        getOneCouponCustomer: "http://localhost:8080/customer/getOneCoupon/",
        getCouponImage: "http://localhost:8080/pics/"
    }

}

// Global settings which are suitable only for production
class ProductionGlobals extends Globals{
    public urls = {
        loginAdmin: "https://coupon-manager-gad.herokuapp.com/admin/login?email=",
        loginCompany: "https://coupon-manager-gad.herokuapp.com/company/login?email=",
        loginCustomer: "https://coupon-manager-gad.herokuapp.com/customer/login?email=",
        password: "&password=",
        getAllCompanies: "https://coupon-manager-gad.herokuapp.com/admin/getAllCompanies",
        addCompany: "https://coupon-manager-gad.herokuapp.com/admin/addCompany",
        updateCompany: "https://coupon-manager-gad.herokuapp.com/admin/updateCompany",
        deleteCompany: "https://coupon-manager-gad.herokuapp.com/admin/deleteCompany?id=",
        getAllCustomers: "https://coupon-manager-gad.herokuapp.com/admin/getAllCustomers",
        addCustomer: "https://coupon-manager-gad.herokuapp.com/admin/addCustomer",
        updateCustomer: "https://coupon-manager-gad.herokuapp.com/admin/updateCustomer",
        deleteCustomer: "https://coupon-manager-gad.herokuapp.com/admin/deleteCustomer?id=",
        getCompanyCoupons: "https://coupon-manager-gad.herokuapp.com/company/getCompanyCoupons",
        getCompanyCouponsByCategory: "https://coupon-manager-gad.herokuapp.com/company/getCompanyCouponsByCategory?category=",
        getCompanyCouponsByMaxPrice: "https://coupon-manager-gad.herokuapp.com/company/getCompanyCouponsByPrice?maxPrice=",
        addCoupon: "https://coupon-manager-gad.herokuapp.com/company/addCoupon",
        updateCoupon: "https://coupon-manager-gad.herokuapp.com/company/updateCoupon",
        deleteCoupon: "https://coupon-manager-gad.herokuapp.com/company/deleteCoupon?id=",
        getAllCoupons:  "https://coupon-manager-gad.herokuapp.com/customer/getAllCoupons",
        purchaseCoupon: "https://coupon-manager-gad.herokuapp.com/customer/purchaseCoupon",
        getCustomerCoupons:"https://coupon-manager-gad.herokuapp.com/customer/getCustomerCoupons",
        getCustomerCouponsByCategory:"https://coupon-manager-gad.herokuapp.com/customer/getCustomerCouponsByCategory?category=",
        getCustomerCouponsByMaxPrice:"https://coupon-manager-gad.herokuapp.com/customer/getCustomerCouponsByPrice?maxPrice=",
        getCompanyDetails: "https://coupon-manager-gad.herokuapp.com/company/getCompanyDetails",
        getOneCompany: "https://coupon-manager-gad.herokuapp.com/admin/getOneCompany?id=",
        getOneCouponCompany: "https://coupon-manager-gad.herokuapp.com/company/getOneCoupon/",
        getOneCouponCustomer: "https://coupon-manager-gad.herokuapp.com/customer/getOneCoupon/",
        getCouponImage: "https://coupon-manager-gad.herokuapp.com/pics/"
    }

}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGoals() : new ProductionGlobals();

export default globals;