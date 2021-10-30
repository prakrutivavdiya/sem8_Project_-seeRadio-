import React, { useState, useEffect } from 'react';
import { FormFeedback, Button, Card, CardBody, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, CardLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import seeRadioIcon from '../assets/see_radio_logo.png';
import validationHandler from '../Validation/Validation';
import { useHistory } from 'react-router-dom';
import { publicPost } from '../Network/Requests';
import { Login_Api_Path } from '../Network/Api';
const Login = () => {
    let history = useHistory();


    if(sessionStorage.getItem('token'))
        history.push('/dashboard');


    //for hiding and showing password
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    //for changing eye icon
    const eye = passwordShown ? <FaEyeSlash onClick={togglePasswordVisiblity} /> : <FaEye onClick={togglePasswordVisiblity} />;

    //email and password validation
    const [validation, setValidation] = useState({
        loginEmail: {
            value: '',
            touched: false,
            valid: false
        },
        loginPassword: {
            value: '',
            touched: false,
            valid: false
        }
    })
    //validation for whole form
    const [isFormValid, setIsFormValid] = useState(false);

    //check for isFormValid when validation for any field changes
    useEffect(() => {
        let valid = true
        for (let field in validation) {
            valid = valid && validation[field].valid
        }
        setIsFormValid(valid)
    }, [validation])

    //check validity and store value on change
    const handleChange = (event) => {
        let isValid = validationHandler(event.target.name, event.target.value)
        setValidation({ ...validation, [event.target.name]: { touched: true, valid: isValid, value: event.target.value } })
        //console.log(event.target.value);
    }
    const handleSubmit = () => {
        let payload = {
            "email": validation.loginEmail.value,
            "password": validation.loginPassword.value
        }
        publicPost(Login_Api_Path,payload,
            (res) => {
                sessionStorage.setItem('token', res.data.data.token);
                sessionStorage.setItem('userId', res.data.data.personData.id)
                history.push(`/dashboard`)
            },
            (err) => {
                window.alert('Error: ' + err.response.data.errorMessage)
            }
        );
    };




    return (
        <div className='my-5'>
            <div>
                <img src={seeRadioIcon} className='mx-auto mb-4' alt='icon' />
            </div>
            <Card className='shadow p-3 col-sm-5 mx-auto' >
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleEmail">Email{' '}<sup style={{ color: 'red' }}>*</sup></Label>
                            <Input valid={validation.loginEmail.touched && validation.loginEmail.valid} invalid={validation.loginEmail.touched && !validation.loginEmail.valid} onChange={handleChange} className='border-top-0 border-right-0 border-left-0' type="email" name="loginEmail" placeholder="Enter email.." />
                            <FormFeedback>Please fill this field</FormFeedback>

                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePassword">Password{' '}<sup style={{ color: 'red' }}>*</sup></Label>
                            <InputGroup>
                                <Input valid={validation.loginPassword.touched && validation.loginPassword.valid} invalid={validation.loginPassword.touched && !validation.loginPassword.valid} onChange={handleChange} className='border-top-0 border-right-0 border-left-0 col-lg-11' type={passwordShown ? "text" : "password"} name="loginPassword" placeholder="Enter password.." />
                                <InputGroupAddon addonType="append" className='border-bottom px-1'>
                                    {eye}
                                </InputGroupAddon>
                                <FormFeedback>Please fill password of 3 to 8 characters</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Button className="col-lg-12" color="primary" disabled={!isFormValid} onClick={handleSubmit}>Login</Button>
                        </FormGroup>
                        <FormGroup>
                            <CardLink href="#">Forgot password?</CardLink>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
export default Login;