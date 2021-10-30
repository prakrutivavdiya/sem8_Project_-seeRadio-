import React, { useState, useEffect } from 'react';
import { FormFeedback, Button, Card, CardBody, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import seeRadioIcon from '../assets/see_radio_logo.png';
import validationHandler from '../Validation/Validation';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';


const Login = () => {
    let history = useHistory();
    const [passwordShown, setPasswordShown] = useState({ old: false, new: false, confirm: false });
    const togglePasswordVisiblity = (key) => {
        setPasswordShown({ ...passwordShown, [key]: (!passwordShown[key]) });

    };
    const eyeOld = passwordShown.old ? <FaEyeSlash onClick={() => togglePasswordVisiblity('old')} /> : <FaEye onClick={() => togglePasswordVisiblity('old')} />;
    const eyeNew = passwordShown.new ? <FaEyeSlash onClick={() => togglePasswordVisiblity('new')} /> : <FaEye onClick={() => togglePasswordVisiblity('new')} />;
    const eyeConfirm = passwordShown.confirm ? <FaEyeSlash onClick={() => togglePasswordVisiblity('confirm')} /> : <FaEye onClick={() => togglePasswordVisiblity('confirm')} />;

    const [validation, setValidation] = useState({

        oldPassword: {
            value: '',
            touched: false,
            valid: false
        },
        newPassword: {
            value: '',
            touched: false,
            valid: false
        },
        confirmPassword: {
            value: '',
            touched: false,
            valid: false
        }
    })
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        let valid = true
        for (let field in validation) {
            valid = valid && validation[field].valid
        }
        setIsFormValid(valid)
    }, [validation])

    const handleChange = (event) => {
        let isValid = validationHandler(event.target.name, event.target.value)
        setValidation({ ...validation, [event.target.name]: { touched: true, valid: isValid, value: event.target.value } })
        //console.log('change in '+event.target.name)
    }

    const handleSubmit = () => {
        if (validation.confirmPassword.value === validation.newPassword.value) {
            let payload = {
                "oldPassword": validation.oldPassword.value,
                "newPassword": validation.newPassword.value
            }
            //console.log(payload)
            axios.post('api/person/changePassword', payload,
                {
                    headers: {
                        'x-token' : sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                })
                .then(res =>  { 
                    window.alert("Password successfully changed."); 
                    history.push(`/dashboard`) 
                }
                ).catch(err =>
                    window.alert('Error: ' + err.response.data.errorMessage)
                )
        }
        else {
            window.alert('Confirm password field doesn\'t match New password field');
        }

    }


    return (
        <div>
            <NavBar />
            <div className='my-5'>
                <div row>
                    <Col>
                        <img src={seeRadioIcon} className='mx-auto mb-4' alt='icon' />
                    </Col>
                </div>
                <Card className='shadow p-3 col-sm-5 mx-auto' >
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label for="oldPassword">Old Password{' '}<sup style={{ color: 'red' }}>*</sup></Label>
                                <InputGroup>
                                    <Input valid={validation.oldPassword.touched && validation.oldPassword.valid} invalid={validation.oldPassword.touched && !validation.oldPassword.valid} onChange={handleChange} className='border-top-0 border-right-0 border-left-0 col-lg-11' type={passwordShown.old ? "text" : "password"} name="oldPassword" placeholder="Old password.." />
                                    <InputGroupAddon addonType="append" className='border-bottom px-1'>
                                        {eyeOld}
                                    </InputGroupAddon>
                                    <FormFeedback>Please fill password of 3 to 8 characters</FormFeedback>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="newPassword">New Password{' '}<sup style={{ color: 'red' }}>*</sup></Label>
                                <InputGroup>
                                    <Input valid={validation.newPassword.touched && validation.newPassword.valid} invalid={validation.newPassword.touched && !validation.newPassword.valid} onChange={handleChange} className='border-top-0 border-right-0 border-left-0 col-lg-11' type={passwordShown.new ? "text" : "password"} name="newPassword" placeholder="New password.." />
                                    <InputGroupAddon addonType="append" className='border-bottom px-1'>
                                        {eyeNew}
                                    </InputGroupAddon>
                                    <FormFeedback>Please fill password of 3 to 8 characters</FormFeedback>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="confirmPassword">Confirm Password{' '}<sup style={{ color: 'red' }}>*</sup></Label>
                                <InputGroup>
                                    <Input valid={validation.confirmPassword.touched && validation.confirmPassword.valid} invalid={validation.confirmPassword.touched && !validation.confirmPassword.valid} onChange={handleChange} className='border-top-0 border-right-0 border-left-0 col-lg-11' type={passwordShown.confirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm password.." />
                                    <InputGroupAddon addonType="append" className='border-bottom px-1'>
                                        {eyeConfirm}
                                    </InputGroupAddon>
                                    <FormFeedback>Please fill password of 3 to 8 characters</FormFeedback>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup row>
                                <Button className="col-lg-12" color="primary" disabled={!isFormValid} onClick={handleSubmit}>Change Password</Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default Login;