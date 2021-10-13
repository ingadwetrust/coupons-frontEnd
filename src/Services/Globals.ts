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
        loginAdmin: "/admin/login?email=",
        loginCompany: "/company/login?email=",
        loginCustomer: "/customer/login?email=",
        password: "&password=",
        getAllCompanies: "/admin/getAllCompanies",
        addCompany: "/admin/addCompany",
        updateCompany: "/admin/updateCompany",
        deleteCompany: "/admin/deleteCompany?id=",
        getAllCustomers: "/admin/getAllCustomers",
        addCustomer: "/admin/addCustomer",
        updateCustomer: "/admin/updateCustomer",
        deleteCustomer: "/admin/deleteCustomer?id=",
        getCompanyCoupons: "/company/getCompanyCoupons",
        getCompanyCouponsByCategory: "/company/getCompanyCouponsByCategory?category=",
        getCompanyCouponsByMaxPrice: "/company/getCompanyCouponsByPrice?maxPrice=",
        addCoupon: "/company/addCoupon",
        updateCoupon: "/company/updateCoupon",
        deleteCoupon: "/company/deleteCoupon?id=",
        getAllCoupons:  "/customer/getAllCoupons",
        purchaseCoupon: "/customer/purchaseCoupon",
        getCustomerCoupons:"/customer/getCustomerCoupons",
        getCustomerCouponsByCategory:"/customer/getCustomerCouponsByCategory?category=",
        getCustomerCouponsByMaxPrice:"/customer/getCustomerCouponsByPrice?maxPrice=",
        getCompanyDetails: "/company/getCompanyDetails",
        getOneCompany: "/admin/getOneCompany?id=",
        getOneCouponCompany: "/company/getOneCoupon/",
        getOneCouponCustomer: "/customer/getOneCoupon/",
        getCouponImage: "/pics/"
    }

}

const globals = process.env.NODE_ENV === "production" ? new DevelopmentGoals() : new ProductionGlobals();

export default globals;