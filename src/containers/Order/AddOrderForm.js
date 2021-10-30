import { Form, FormGroup, Input, Label, Button, ButtonGroup, Col, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import validationHandler from '../../Validation/Validation';
import { useHistory } from 'react-router-dom';
import { privateGet, privatePost } from '../../Network/Requests';
import { Create_Campaign, Get_All_Clients, Get_All_Markets } from '../../Network/Api';
import InputSelect from '../../components/InputSelect';

const AddOrderForm = (props) => {
    const history = useHistory();
    let client = JSON.parse(sessionStorage.getItem('client'));

    const data = { ...props.orderData }

    const [marketOption, setMarketOption] = useState([])
    const [advertiserOption, setAdvertiserOption] = useState([])

    useEffect(() => {

        privateGet(Get_All_Markets,
            { 'x-token': sessionStorage.getItem('token') },
            res => {
                let markets = res.data.data
                setMarketOption(markets.map(market => {
                    return { value: market.name, label: market.name }
                })
                )
            },
            err => alert(err.message)
        )
        privateGet(Get_All_Clients,
            { 'x-token': sessionStorage.getItem('token') },

            res => {

                let advertisers = res.data.data
                setAdvertiserOption(advertisers.map(advertiser => {
                    if (client.salesOrgCompany.companyName === advertiser.companyName) {
                        let updatedData = {
                            ...data.data, advertiser: { value:advertiser.id, touched: true, valid: true }
                        }
                        props.setOrderData({ ...data, data: updatedData })
                    }
                    return { value: advertiser.id, label: advertiser.companyName }

                })
                )

            },
            err => alert(err.message)
        )

    }, [])


    const handleChange = (event) => {
        let isValid = validationHandler(event.target.name, event.target.value)
        data.data[event.target.name] = { value: event.target.value, touched: true, valid: isValid }
        let valid = true
        for (let field in data.data) {
            valid = valid && data.data[field].valid
        }
        data.isFormValid = valid;
        props.setOrderData({ ...data });
    }

    const createOrder = () => {
        let campaignData = {
            "clientCompanyID": data.data.advertiser.value,
            "title": data.data.title.value,
            "description": data.data.description.value,
            "landingpageURL": data.data.landingPageUrl.value,
            "targetMarket": data.data.targetMarket.value,
            "distributionBudget": data.data.budget.value,
            "startDate": new Date(),
            "price": data.data.price.value,
            "soaID": client.salesOrgCompany.soaID,
            "sosID": client.salesOrgCompany.sosID,
            "salesOrgCompanyID": client.salesOrgCompany.parentSalesOrgCompanyID,
            "statusByPersonID": client.person.createdByPerson,
            "statusWithPersonID": client.salesOrgCompany.clientPersonID
        }
        const headers = {
            'Content-Type': 'application/json',
            'x-token': sessionStorage.getItem('token')
        }
        privatePost(Create_Campaign, headers, campaignData,
            res => {
                sessionStorage.setItem('order', JSON.stringify(res.data.data))
                console.log(res.data.data)
                props.onSubmit();
            },
            err => {
                alert(err)
            }
        );

    }

    return (
        <div className='container my-5'>
            <p className='text-left text-primary font-weight-bold'>Add New Orders</p>
            <div className='container card p-4'>
                <Form>
                    <FormGroup row>
                        <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Order</Label>
                        <Col>
                            <p className='text-left'>Advertiser</p>
                            <InputSelect options={advertiserOption} value={data.data.advertiser.value} valid={data.data.advertiser.touched && data.data.advertiser.valid} invalid={data.data.advertiser.touched && !data.data.advertiser.valid} onChange={handleChange} placeholder="Test Bacancy" name='advertiser' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Title</p>
                            <Input value={data.data.title.value} type="text" valid={data.data.title.touched && data.data.title.valid} invalid={data.data.title.touched && !data.data.title.valid} onChange={handleChange} placeholder="Title" name='title' sm={5} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>

                    </FormGroup>

                    <FormGroup row>
                        <Col>
                            <p className='text-left'>Preffered Landing Page Url</p>
                            <Input value={data.data.landingPageUrl.value} type="text" valid={data.data.landingPageUrl.touched && data.data.landingPageUrl.valid} invalid={data.data.landingPageUrl.touched && !data.data.landingPageUrl.valid} onChange={handleChange} placeholder="www.testbacancy.com" name='landingPageUrl' sm={5} />
                            <FormFeedback>Please fill valid url</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Price</p>
                            <Input value={data.data.price.value} type="text" valid={data.data.price.touched && data.data.price.valid} invalid={data.data.price.touched && !data.data.price.valid} onChange={handleChange} placeholder="Price" name='price' sm={5} />
                            <FormFeedback>Please fill a valid decimal number</FormFeedback>
                        </Col>

                    </FormGroup>

                    <FormGroup row>
                        <Col sm={6}>
                            <p className='text-left'>Description</p>
                            <Input value={data.data.description.value} type="textarea" valid={data.data.description.touched && data.data.description.valid} invalid={data.data.description.touched && !data.data.description.valid} onChange={handleChange} rows='5' name="description" id="description" placeholder='Description' />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Distribution</Label>
                        <Col sm={6}>
                            <p className='text-left'>Target Market</p>
                            <InputSelect options={marketOption} value={data.data.targetMarket.value} valid={data.data.targetMarket.touched && data.data.targetMarket.valid} invalid={data.data.targetMarket.touched && !data.data.targetMarket.valid} name='targetMarket' onChange={handleChange} />
                            <FormFeedback>Please fill this field</FormFeedback>
                        </Col>
                        <Col>
                            <p className='text-left'>Budget</p>
                            <Input value={data.data.budget.value} type="text" valid={data.data.budget.touched && data.data.budget.valid} invalid={data.data.budget.touched && !data.data.budget.valid} placeholder="$0" name='budget' sm={5} onChange={handleChange} />
                            <FormFeedback>Please fill valid decimal number</FormFeedback>
                        </Col>

                    </FormGroup>

                    <FormGroup row className='d-flex justify-content-between'>
                        <Button color="primary" className='col-lg-2 m-1' onClick={props.onPrev}>Back</Button>
                        <ButtonGroup className='col-lg-9 col-sm-12 justify-content-end'>
                            <Button color="secondary" className='col-lg-3 col-sm-6 m-1 rounded-right' onClick={() => history.push(`/dashboard`)}>Cancel</Button>{' '}
                            <Button color="primary" disabled={!data.isFormValid} className='col-lg-3 col-sm-6 m-1 rounded-left' onClick={createOrder}>Create Order</Button>
                        </ButtonGroup>
                    </FormGroup>

                </Form>
            </div>
        </div>
    );
}
export default AddOrderForm;