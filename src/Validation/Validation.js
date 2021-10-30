const regex_nonempty = /^(?!\s*$).+$/;
const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//const regex_password = /^[a-zA-Z0-9]{3,8}$/;
const regex_phone= /^(\d{3})-(\d{3})-(\d{4})$/;
const regex_url = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const regex_decimal_precision_two=/^\d+(\.\d{1,4})?$/;
const regex_password = /^[a-zA-Z0-9]{3,8}$/;
const regex_postalUS = /(^\d{5}$)|(^\d{5}-\d{4}$)/
const regex_postalCA = /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/
export const regex={

    //login
    loginEmail:regex_email,
    loginPassword:regex_password,


    //change password
    oldPassword:regex_password,
    newPassword:regex_password,
    confirmPassword:regex_password,

    
    //form 1: add new advertiser
    companyName: regex_nonempty,
    website: regex_url,
    industryCategory:regex_nonempty,
    fname:regex_nonempty,
    lname:regex_nonempty,
    email:regex_email,
    phone:regex_phone,
    
    secondaryfname:regex_nonempty,
    secondarylname:regex_nonempty,
    secondaryemail:regex_email,
    secondaryphone:regex_phone,
    //checkbox:regex_nonempty,
    
    address1:regex_nonempty,
    address2:regex_nonempty,
    city:regex_nonempty,
    country:regex_nonempty,
    state:regex_nonempty,
    CApostalCode:regex_postalCA,
    USpostalCode:regex_postalUS,
    secondaryaddress1:regex_nonempty,
    secondaryaddress2:regex_nonempty,
    secondarycity:regex_nonempty,
    secondarycountry:regex_nonempty,
    secondarystate:regex_nonempty,    
    CAsecondarypostalCode:regex_postalCA,
    USsecondarypostalCode:regex_postalUS,
    //checkbox2:regex_nonempty



    //form 2: Add Order
    advertiser:regex_nonempty,
    title:regex_nonempty,
    landingPageUrl:regex_url,
    price:regex_decimal_precision_two,
    description:regex_nonempty,
    targetMarket:regex_nonempty,
    budget:regex_decimal_precision_two

}

const validationHandler = (name, value) => {
    //console.log('checked '+name,regex[name]+' '+regex[name].test(value))
    return regex[name].test(value)
}
export default validationHandler;

export const fileValidationHandler=(acceptedFiles)=>{
    //console.log(acceptedFiles[0]!==undefined)
    return (!acceptedFiles[0])
}
