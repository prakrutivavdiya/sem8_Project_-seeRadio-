import AddAssetsForm from './AddAssetsForm';
import AddNewAdvertiserForm from './AddNewAdvertiserForm';
import AddOrderForm from './AddOrderForm';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import CustomStepper from '../../components/CustomStepper';

const MultiStepForm = () => {

    //form 1
    const [advertiserData, setAdvertiserData] = useState({
        data: {
            companyName: { value: '', touched: false, valid: false },
            website: { value: '', touched: false, valid: false },
            industryCategory: { value: '', touched: false, valid: false },
            fname: { value: '', touched: false, valid: false },
            lname: { value: '', touched: false, valid: false },
            email: { value: '', touched: false, valid: false },
            phone: { value: '', touched: false, valid: false },
            //checkbox: { value: '', touched: false, valid: false },
            address1: { value: '', touched: false, valid: false },
            address2: { value: '', touched: false, valid: false },
            city: { value: '', touched: false, valid: false },
            country: { value: '', touched: false, valid: false },
            state: { value: '', touched: false, valid: false },
            postalCode: { value: '', touched: false, valid: false },
            //checkbox2: { value: '', touched: false, valid: false },
        },

        isFormValid: false,
    })
    const [secondaryContact, setSecondaryContact] = useState(
        {
            data: {
                secondaryfname: { value: '', touched: false, valid: false },
                secondarylname: { value: '', touched: false, valid: false },
                secondaryemail: { value: '', touched: false, valid: false },
                secondaryphone: { value: '', touched: false, valid: false }
            },
            isFormValid: false
        }
    );
    const [billingAddress, setBillingAddress] = useState(
        {
            data: {
                secondaryaddress1: { value: '', touched: false, valid: false },
                secondaryaddress2: { value: '', touched: false, valid: false },
                secondarycity: { value: '', touched: false, valid: false },
                secondarycountry: { value: '', touched: false, valid: false },
                secondarystate: { value: '', touched: false, valid: false },
                secondarypostalCode: { value: '', touched: false, valid: false },
            },
            isFormValid: false
        }
    );
    //form 2
    const [orderData, setOrderData] = useState({
        data: {
            advertiser: { value: null, touched: false, valid: false },
            title: { value: '', touched: false, valid: false },
            landingPageUrl: { value: '', touched: false, valid: false },
            price: { value: '', touched: false, valid: false },
            description: { value: '', touched: false, valid: false },
            targetMarket: { value: null, touched: false, valid: false },
            budget: { value: '', touched: false, valid: false },
        },

        isFormValid: false,
    })
    const [formStep, setFormStep] = useState(1);
    const nextStep = () => { setFormStep(formStep + 1) }
    const prevStep = () => { setFormStep(formStep - 1) }
    let step;
    if (formStep === 1) step = (<AddNewAdvertiserForm onSubmit={nextStep} advertiserData={advertiserData} setAdvertiserData={setAdvertiserData} secondaryContact={secondaryContact} setSecondaryContact={setSecondaryContact} billingAddress={billingAddress} setBillingAddress={setBillingAddress} />);
    else if (formStep === 2) step = (<AddOrderForm onPrev={prevStep} onSubmit={nextStep} orderData={orderData} setOrderData={setOrderData} />);
    else if (formStep === 3) step = (<AddAssetsForm onPrev={prevStep} />);
    return (
        <div>
            <NavBar />
            <CustomStepper activeStep={formStep} />
            {step}
        </div>

    );

}
export default MultiStepForm;