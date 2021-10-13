// Global settings which are the same for development and production
class Globals {

}   

// Global settings which are suitable only for development:
class DevelopmentGoals extends Globals{
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

const globals = process.env.NODE_ENV === "production" ? new DevelopmentGoals() : new ProductionGlobals();

export default globals;