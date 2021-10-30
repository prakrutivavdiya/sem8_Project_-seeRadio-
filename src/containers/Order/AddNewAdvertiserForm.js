import { Form, FormGroup, Input, Label, Button, Col, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import validationHandler from '../../Validation/Validation';
import { useHistory } from 'react-router-dom';
import { privateGet, privatePost, publicGet } from '../../Network/Requests';
import { Add_Advertiser_Api_Path, Country_Api_Path, Get_All_Industry_Api_Path, Get_States_Api_Path } from '../../Network/Api';
import InputSelect from '../../components/InputSelect';
const AddNewAdvertiserForm = (props) => {
    const history = useHistory();

    const data = { ...props.advertiserData }
    const secondaryContactData = { ...props.secondaryContact }
    const billingAddressData = { ...props.billingAddress }

    const [countriesOption, setCountriesOption] = useState([])
    const [stateOptions, setStateOption] = useState([])
    const [secStateOptions, setSecStateOption] = useState([])
    const [industryOptions, setIndustryOptions] = useState([])



    //get countries and industries
    useEffect(() => {
        publicGet(Country_Api_Path,
            (res) => {
                //convert object of objects to array of objects
                let countries = res.data.data
                setCountriesOption(countries.map(country => {
                    return { value: country.code, label: country.name }
                }))
            },
            (res) => {
                console.log(res)
            }

        )

        const headers = {
            'x-token': sessionStorage.getItem('token')
        }
        privateGet(Get_All_Industry_Api_Path,
            headers,
            (res => {
                let industries = res.data.data
                setIndustryOptions(industries.map(industry => {
                    return { value: industry.id, label: industry.name }
                })
                )
            }),
            res => console.log(res)
        );
    }, [])
    useEffect(() => {
        billingAddressData.data.secondarystate={ value: '', touched: false, valid: false };
        billingAddressData.data.secondarypostalCode={ value: '', touched: false, valid: false };
        props.setBillingAddress({...billingAddressData})
        if (billingAddressData.data.secondarycountry.value !== '') {
            publicGet(Get_States_Api_Path + billingAddressData.data.secondarycountry.value,
                res => {
                    let states = res.data.data
                    setSecStateOption(states.map(state => {
                        return { value: state.code, label: state.name }
                    })
                    )
                },
                res => console.log(res)
            )
        }
    }, [billingAddressData.data.secondarycountry.value])
    useEffect(() => {
        data.data.state={ value: '', touched: false, valid: false };
        data.data.postalCode={ value: '', touched: false, valid: false };
        props.setAdvertiserData({...data})
        if (data.data.country.value !== '') {
            publicGet(Get_States_Api_Path + data.data.country.value,
                res => {
                    let states = res.data.data
                    setStateOption(states.map(state => {
                        return { value: state.code, label: state.name }
                    })
                    )
                },
                res => console.log(res)
            )
        }
    }, [data.data.country.value])
    //handle change
    const handleChange = (event) => {
        let isValid;
        if (event.target.name === 'postalCode') {
            isValid = validationHandler(data.data.country.value + event.target.name, event.target.value)
        }
        else {
            isValid = validationHandler(event.target.name, event.target.value)
        }
        data.data[event.target.name]={ value: event.target.value, touched: true, valid: isValid };
        //set is form valid
        let valid = true
        for (let field in data.data) {

            valid = valid && data.data[field].valid
            //console.log(field,valid)
        }
        data.isFormValid = valid;
        //console.log('isFormValid', data.isFormValid);
        props.setAdvertiserData({...data})
        //console.log('change in '+event.target.name)
    }

    const secondaryContacthandleChange = (event) => {
        let isValid = validationHandler(event.target.name, event.target.value)
        secondaryContactData.data[event.target.name]= { value: event.target.value, touched: true, valid: isValid };
        let valid = true
        for (let field in secondaryContactData.data) {
            valid = valid && secondaryContactData.data[field].valid
        }
        secondaryContactData.isFormValid = valid;
        props.setSecondaryContact({ ...secondaryContactData})
        //console.log('change in '+event.target.name)
    }
    const billingAddresshandleChange = (event) => {
        let isValid;
        if (event.target.name === 'secondarypostalCode') {
            //console.log(billingAddressData.data.secondarycountry.value + event.target.name)
            isValid = validationHandler(billingAddressData.data.secondarycountry.value + event.target.name, event.target.value)
        }
        else {

            isValid = validationHandler(event.target.name, event.target.value)
        }
        billingAddressData.data[event.target.name]={ value: event.target.value, touched: true, valid: isValid };
        
        let valid = true
        for (let field in billingAddressData.data) {
            valid = valid && billingAddressData.data[field].valid
        }
        billingAddressData.isFormValid = valid
        props.setBillingAddress({ ...billingAddressData})
        //console.log('change in '+event.target.name)
    }
    //collapse toggle
    const [isSecondaryContactOpen, setIsSecondaryContactOpen] = useState(false);
    const toggleSecondaryContact = () => setIsSecondaryContactOpen(!isSecondaryContactOpen);

    const [isBillingAddressOpen, setIsBillingAddressOpen] = useState(false);
    const toggleBillingAddress = () => setIsBillingAddressOpen(!isBillingAddressOpen);
    let secondaryContactForm = null
    if (isSecondaryContactOpen) {
        secondaryContactForm = (
            <>
                <FormGroup row>
                    <Col>
                        <p className='text-left'>First Name</p>
                        <Input value={secondaryContactData.data.secondaryfname.value} type="text" valid={secondaryContactData.data.secondaryfname.touched && secondaryContactData.data.secondaryfname.valid} invalid={secondaryContactData.data.secondaryfname.touched && !secondaryContactData.data.secondaryfname.valid} onChange={secondaryContacthandleChange} placeholder="First Name" name='secondaryfname' sm={5} />
                        <FormFeedback>Please fill this field</FormFeedback>
                    </Col>
                    <Col>
                        <p className='text-left'>Last Name</p>
                        <Input value={secondaryContactData.data.secondarylname.value} type="text" valid={secondaryContactData.data.secondarylname.touched && secondaryContactData.data.secondarylname.valid} invalid={secondaryContactData.data.secondarylname.touched && !secondaryContactData.data.secondarylname.valid} onChange={secondaryContacthandleChange} placeholder="Last Name" name='secondarylname' sm={5} />
                        <FormFeedback>Please fill this field</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <p className='text-left'>Email</p>
                        <Input type="email" value={secondaryContactData.data.secondaryemail.value} valid={secondaryContactData.data.secondaryemail.touched && secondaryContactData.data.secondaryemail.valid} invalid={secondaryContactData.data.secondaryemail.touched && !secondaryContactData.data.secondaryemail.valid} onChange={secondaryContacthandleChange} placeholder="Enter Email" name='secondaryemail' sm={5} />
                        <FormFeedback>Please fill valid email id</FormFeedback>
                    </Col>
                    <Col>
                        <p className='text-left'>Phone</p>
                        <Input type="text" value={secondaryContactData.data.secondaryphone.value} valid={secondaryContactData.data.secondaryphone.touched && secondaryContactData.data.secondaryphone.valid} invalid={secondaryContactData.data.secondaryphone.touched && !secondaryContactData.data.secondaryphone.valid} onChange={secondaryContacthandleChange} placeholder="Enter Phone No." name='secondaryphone' sm={5} />
                        <FormFeedback>Valid format is xxx-xxx-xxxx</FormFeedback>
                    </Col>
                </FormGroup>
            </>
        );
    }
    let secondaryBillingForm = null
    if (isBillingAddressOpen) {
        secondaryBillingForm = <>
            <FormGroup row>
                <Col>
                    <p className='text-left'>Address</p>
                    <Input type="text" value={billingAddressData.data.secondaryaddress1.value} valid={billingAddressData.data.secondaryaddress1.touched && billingAddressData.data.secondaryaddress1.valid} invalid={billingAddressData.data.secondaryaddress1.touched && !billingAddressData.data.secondaryaddress1.valid} onChange={billingAddresshandleChange} placeholder="Enter Address" name='secondaryaddress1' sm={5} />
                    <FormFeedback>Please fill this field</FormFeedback>
                </Col>
                <Col>
                    <p className='text-left'>Address Line 2</p>
                    <Input type="text" value={billingAddressData.data.secondaryaddress2.value} valid={billingAddressData.data.secondaryaddress2.touched && billingAddressData.data.secondaryaddress2.valid} invalid={billingAddressData.data.secondaryaddress2.touched && !billingAddressData.data.secondaryaddress2.valid} onChange={billingAddresshandleChange} placeholder="Enter Address" name='secondaryaddress2' sm={5} />
                    <FormFeedback>Please fill this field</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                    <p className='text-left'>City</p>
                    <Input type="text" value={billingAddressData.data.secondarycity.value} valid={billingAddressData.data.secondarycity.touched && billingAddressData.data.secondarycity.valid} invalid={billingAddressData.data.secondarycity.touched && !billingAddressData.data.secondarycity.valid} onChange={billingAddresshandleChange} placeholder="Enter City" name='secondarycity' sm={5} />
                    <FormFeedback>Please fill this field</FormFeedback>
                </Col>
                <Col>
                    <p className='text-left'>Country</p>
                    <InputSelect value={billingAddressData.data.secondarycountry.value} valid={billingAddressData.data.secondarycountry.touched && billingAddressData.data.secondarycountry.valid} invalid={billingAddressData.data.secondarycountry.touched && !billingAddressData.data.secondarycountry.valid} options={countriesOption} onChange={billingAddresshandleChange} name='secondarycountry' />
                    <FormFeedback>Please fill this field</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                    <p className='text-left'>State/Provinance</p>
                    <InputSelect value={billingAddressData.data.secondarystate.value} options={secStateOptions} valid={billingAddressData.data.secondarystate.touched && billingAddressData.data.secondarystate.valid} invalid={billingAddressData.data.secondarystate.touched && !billingAddressData.data.secondarystate.valid} onChange={billingAddresshandleChange} name='secondarystate' />
                    <FormFeedback>Please fill this field</FormFeedback>
                </Col>
                <Col>
                    <p className='text-left'>Postal Code</p>
                    <Input type="text" value={billingAddressData.data.secondarypostalCode.value} valid={billingAddressData.data.secondarypostalCode.touched && billingAddressData.data.secondarypostalCode.valid} invalid={billingAddressData.data.secondarypostalCode.touched && !billingAddressData.data.secondarypostalCode.valid} onChange={billingAddresshandleChange} placeholder="Enter Postal Code" sm={5} name='secondarypostalCode' />
                    <FormFeedback>Please fill valid Postal Code</FormFeedback>
                </Col>
            </FormGroup>
        </>
    }


    const createAdvertiserHandler = () => {
        let business = {
            "address": data.data.address1.value,
            "address2": data.data.address2.value,
            "city": data.data.city.value,
            "postal": data.data.postalCode.value,
            "country": data.data.country.value,
            "state": data.data.state.value,
            "provinceID": 2
        }
        let billing;
        if (isBillingAddressOpen) {
            billing = {
                "address": billingAddressData.data.secondaryaddress1.value,
                "address2": billingAddressData.data.secondaryaddress2.value,
                "city": billingAddressData.data.secondarycity.value,
                "state": billingAddressData.data.secondarystate.value,
                "postal": billingAddressData.data.secondarypostalCode.value,
                "country": billingAddressData.data.secondarycountry.value,
                "provinceID": 2
            }
        } else {
            billing = business
        }

        let clientData = {
            "companyName": data.data.companyName.value,
            "industryID": data.data.industryCategory.value,
            "companyWebsite": data.data.website.value,
            "companyType": "Client",
            "contactAddress": {
                "business": business,
                "billing": billing,
                "useSame": !setIsBillingAddressOpen
            },
            "addressType": "Billing",
            "firstName": data.data.fname.value,
            "lastName": data.data.lname.value,
            "email": data.data.email.value,
            "phone": data.data.phone.value,
            "roleCode": "CLIENT",
            "createdByPerson": sessionStorage.getItem('userId')
        }
        if (isSecondaryContactOpen) {
            let clientSecondaryContact = {
                "firstName": secondaryContactData.data.secondaryfname.value,
                "lastName": secondaryContactData.data.secondarylname.value,
                "email": secondaryContactData.data.secondaryemail.value,
                "phone": secondaryContactData.data.secondaryphone.value
            }
            clientData['secondaryContact'] = clientSecondaryContact
        }
        const headers = {
            'Content-Type': 'application/json',
            'x-token': sessionStorage.getItem('token')
        }
        //console.log('headers', headers)

         privatePost(Add_Advertiser_Api_Path, headers, clientData,
             res => {
                 //console.log('responce', res.data.data)
                 sessionStorage.setItem('client',JSON.stringify(res.data.data));
                 props.onSubmit();
             },
             error => console.log(error.response.data.errorMessage)
         )
         
        //props.onSubmit();

    }
    return (
        <div className='container my-5'>
            <p className='text-left text-primary font-weight-bold'>Add New Advertiser</p>
            <div className='container card p-4'>
                <Form>
                    <FormGroup row>
                        <Col>
                            <p className='text-left'>Company Name</p>
                            <Input type="text" value={data.data.companyName.value} valid={data.data.companyName.touched && data.data.companyName.valid} invalid={data.data.companyName.touched && !data.data.companyName.valid} onChange={handleChange} placeholder="Company Name" name='companyName' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Company Website Address</p>
                            <Input type="text" value={data.data.website.value} valid={data.data.website.touched && data.data.website.valid} invalid={data.data.website.touched && !data.data.website.valid} onChange={handleChange} placeholder="eg. www.abc.com" name='website' sm={5} />
                            <FormFeedback>Please fill valid website address</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={6}>
                            <p className='text-left'>Industry Category</p>
                            <InputSelect value={data.data.industryCategory.value} options={industryOptions} valid={data.data.industryCategory.touched && data.data.industryCategory.valid} invalid={data.data.industryCategory.touched && !data.data.industryCategory.valid} onChange={handleChange} name='industryCategory' />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Primary Contact</Label>
                    <FormGroup row>
                        <Col>
                            <p className='text-left'>First Name</p>
                            <Input type="text" value={data.data.fname.value} valid={data.data.fname.touched && data.data.fname.valid} invalid={data.data.fname.touched && !data.data.fname.valid} onChange={handleChange} placeholder="First Name" name='fname' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Last Name</p>
                            <Input type="text" value={data.data.lname.value} valid={data.data.lname.touched && data.data.lname.valid} invalid={data.data.lname.touched && !data.data.lname.valid} onChange={handleChange} placeholder="Last Name" name='lname' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col>
                            <p className='text-left'>Email</p>
                            <Input type="email" value={data.data.email.value} onChange={handleChange} valid={data.data.email.touched && data.data.email.valid} invalid={data.data.email.touched && !data.data.email.valid} placeholder="Enter Email" name='email' sm={5} />
                            <FormFeedback>Please fill valid email id</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Phone</p>
                            <Input type="text" value={data.data.phone.value} valid={data.data.phone.touched && data.data.phone.valid} invalid={data.data.phone.touched && !data.data.phone.valid} onChange={handleChange} placeholder="Enter Phone No." name='phone' sm={5} />
                            <FormFeedback>Valid format is xxx-xxx-xxxx</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='text-left m-4 bg-light text-muted'>
                            <Input type="checkbox" className='ml-0' name='checkbox' onClick={toggleSecondaryContact} />
                            <Label className='ml-2 col-9 font-weight-bold'>Secondary Contact (Billing . optional)</Label>
                        </Col>
                    </FormGroup>
                    {secondaryContactForm}
                    <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Business Address</Label>
                    <FormGroup row>
                        <Col>
                            <p className='text-left'>Address</p>
                            <Input type="text" value={data.data.address1.value} valid={data.data.address1.touched && data.data.address1.valid} invalid={data.data.address1.touched && !data.data.address1.valid} onChange={handleChange} placeholder="Enter Address" name='address1' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Address Line 2</p>
                            <Input type="text" value={data.data.address2.value} valid={data.data.address2.touched && data.data.address2.valid} invalid={data.data.address2.touched && !data.data.address2.valid} onChange={handleChange} placeholder="Enter Address" name='address2' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col>
                            <p className='text-left'>City</p>
                            <Input type="text" value={data.data.city.value} valid={data.data.city.touched && data.data.city.valid} invalid={data.data.city.touched && !data.data.city.valid} onChange={handleChange} placeholder="Enter City" name='city' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Country</p>
                            <InputSelect value={data.data.country.value} options={countriesOption} valid={data.data.country.touched && data.data.country.valid} invalid={data.data.country.touched && !data.data.country.valid} onChange={handleChange} name='country' />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col>
                            <p className='text-left'>State/Provinance</p>
                            <InputSelect value={data.data.state.value} options={stateOptions} valid={data.data.state.touched && data.data.state.valid} invalid={data.data.state.touched && !data.data.state.valid} onChange={handleChange} name='state' />

                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Postal Code</p>
                            <Input type="text" value={data.data.postalCode.value} valid={data.data.postalCode.touched && data.data.postalCode.valid} invalid={data.data.postalCode.touched && !data.data.postalCode.valid} onChange={handleChange} placeholder="Enter Postal Code" sm={5} name='postalCode' />
                            <FormFeedback>Please fill valid Postal Code</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='text-left m-4 bg-light text-muted'>
                            <Input type="checkbox" name='checkbox2' className='ml-0' onClick={toggleBillingAddress} />
                            <Label className='col-9 font-weight-bold ml-1'>Billing Address (optional)</Label>
                        </Col>
                    </FormGroup>
                    {secondaryBillingForm}
                    <FormGroup row className='justify-content-end'>
                        <Button color="secondary" className='col-lg-3 col-sm-5 m-1' onClick={() => history.push(`/dashboard`)}>Cancel</Button>
                        <Button color="primary" className='col-lg-3 col-sm-5 m-1' onClick={createAdvertiserHandler} disabled={!(data.isFormValid && (!isSecondaryContactOpen || secondaryContactData.isFormValid) && (!isBillingAddressOpen || billingAddressData.isFormValid))}>Create Advertiser</Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}
export default AddNewAdvertiserForm;
