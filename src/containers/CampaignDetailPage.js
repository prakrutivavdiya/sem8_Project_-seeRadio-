import { Form, FormGroup, Label, Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFileAlt, FaMicrophone, FaClone, FaHistory, FaDownload } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Dropzone from 'react-dropzone';
import NavBar from '../components/NavBar';

const CampaignDetailPage = () => {
    return (
        <div>
            <NavBar />
            <div className='container'>
                <Row className='font-weight-bold text-left ml-5'>
                    <Col>
                        <p className='text-secondary'>Advertiser</p>
                        <p>Test Bacancy</p>
                    </Col>
                    <Col>
                        <p className='text-secondary'>Order Name</p>
                        <p>Test</p>
                    </Col>
                    <Col>
                        <p className='text-secondary'>Order Number</p>
                        <p>00001-00003-00001</p>
                    </Col>
                    <Col>
                        <p className='text-secondary'>Sales Organization</p>
                        <p>Add Assets</p>
                    </Col>
                </Row>

                <div className='container card px-5 py-3'>
                    <Form>
                        <FormGroup row className='font-weight-bold text-left'>
                            <Col>
                                <p className='text-secondary'>Status</p>
                                <p>Advertisers Assets Required</p>
                            </Col>
                            <Col>
                                <p className='text-secondary'>Action required by</p>
                                <p>Test Bacancy</p>
                            </Col>
                            <Col>
                                <p className='text-secondary'>Next Action Due By</p>
                                <p>Invalid date</p>
                            </Col>
                            <Col>
                                <IconContext.Provider
                                    value={{ size: '40px' }}>
                                    <div className='text-center my-3'>
                                        <FaHistory />
                                    </div>
                                </IconContext.Provider>
                            </Col>
                        </FormGroup>
                        <hr />

                        <FormGroup row>
                            <Col sm={11} className='text-left font-weight-bold'>
                                <p className='text-secondary'>Information</p>
                                <hr />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={4} className='text-left font-weight-bold border-right'>
                                <Label className='bg-light text-muted col-12'>Account Manager Assigned</Label>
                                <Label className='col-12'>Hiral Baraiya</Label>
                            </Col>
                            <Col sm={5} className='text-left font-weight-bold'>
                                <Label className='bg-light text-muted col-12'>Distribution Partner Company Assigned</Label>
                                <Label className='col-12'>Not Yet Assigned</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={4} className='text-left font-weight-bold border-right'>
                                <Label className='bg-light text-muted col-12'>Sales Person Assigned</Label>
                                <Label className='col-12'>Hiral Baraiya</Label>
                            </Col>
                            <Col sm={5} className='text-left font-weight-bold'>
                                <Label className='bg-light text-muted col-12'>Graffic Designer Assigned</Label>
                                <Label className='col-12'>Not Yet Assigned</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={11} className='text-left font-weight-bold'>
                                <p className='text-secondary'>Production Progress</p>
                                <hr />
                            </Col>
                            <Col className='text-left font-weight-bold ml-5'>
                                <p>Advertisers Assets Required</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='font-weight-bold text-primary text-left'>
                            <IconContext.Provider
                                value={{ color: 'dodgerblue' }}>
                                <Col sm={12}>
                                    <FaDownload />{' '}
                                    <span>Download All Assets</span>
                                </Col>

                            </IconContext.Provider>
                        </FormGroup>
                        <FormGroup row>
                            <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Script File</Label>
                            <Col sm={6}>
                                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} className='p-3 text-left border'>
                                            <input {...getInputProps()} />
                                            <IconContext.Provider
                                                value={{ color: 'dodgerblue', size: '60px' }}>
                                                <div>
                                                    <FaFileAlt />{'  Drag and drop your Script file here'}
                                                </div>
                                            </IconContext.Provider>

                                        </div>
                                    )}
                                </Dropzone>
                            </Col>
                            <Col sm={1}>
                                <p className="font-weight-bold text-secondary">OR</p>
                            </Col>
                            <Col sm={4}>
                                <label htmlFor="files" className="px-4 btn btn-secondary">Upload</label>
                                <input style={{ visibility: 'hidden' }} type="file" />
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Voice File</Label>
                            <Col sm={6}>
                                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} className='p-3 text-left border'>
                                            <input {...getInputProps()} />
                                            <IconContext.Provider
                                                value={{ color: 'dodgerblue', size: '60px' }}>
                                                <div>
                                                    <FaMicrophone />{'  Drag and drop your Voice file here'}
                                                </div>
                                            </IconContext.Provider>

                                        </div>
                                    )}
                                </Dropzone>
                            </Col>
                            <Col sm={1}>
                                <p className="font-weight-bold text-secondary">OR</p>
                            </Col>
                            <Col sm={4}>
                                <label htmlFor="files" className="px-4 btn btn-secondary">Upload</label>
                                <input style={{ visibility: 'hidden' }} type="file" />
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Advertiser Assets
                        </Label>
                            <Col sm={6}>
                                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} className='p-3 text-left border'>
                                            <input {...getInputProps()} />
                                            <IconContext.Provider
                                                value={{ color: 'dodgerblue', size: '60px' }}>
                                                <div>
                                                    <FaClone />{'  Drag and drop your file here'}
                                                </div>
                                            </IconContext.Provider>
                                        </div>
                                    )}
                                </Dropzone>
                            </Col>
                            <Col sm={1}>
                                <p className="font-weight-bold text-secondary">OR</p>
                            </Col>
                            <Col sm={4}>
                                <label htmlFor="files" className="px-4 btn btn-secondary">Upload</label>
                                <input style={{ visibility: 'hidden' }} type="file" />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Advertiser Assets List</Label>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>File Name</th>
                                        <th>File Uploaded By</th>
                                        <th>File Uploaded Date</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Screenshot from 2021-02-17 18-08-43.png</td>
                                        <td>Hiral Baraiya</td>
                                        <td>23-Feb-2021</td>
                                        <td className='text-primary font-weight-bold'>
                                            <IconContext.Provider
                                                value={{ color: 'dodgerblue' }}>
                                                <FaDownload />{' '}
                                                <span>Download</span>
                                            </IconContext.Provider>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>


                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={12} className='text-left font-weight-bold'>
                                    <p className='text-secondary'>Order</p>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='text-left'>
                                <Col sm={4}>
                                    <p className='font-weight-bold '>Status</p>
                                    <p>Advertisers Assets Required</p>
                                </Col>
                            </Row>
                            <Row className='text-left'>
                                <Col sm={4}>
                                    <p className='font-weight-bold '>Preffered Landing Website URL</p>
                                    <a href='www.testbacancy.com'>www.testbacancy.com</a>
                                </Col>
                                <Col sm={4}>
                                    <p className='font-weight-bold '>Distribution Budget</p>
                                    <p>$50.00</p>
                                </Col>

                            </Row>
                            <Row className='text-left'>
                                <Col sm={4}>
                                    <p className='font-weight-bold '>Target Market</p>
                                    <p>Calgary</p>
                                </Col>
                                <Col sm={4}>
                                    <p className='font-weight-bold '>Industry Category</p>
                                    <p>Arts & Entertainment</p>
                                </Col>
                                <Col sm={4}>
                                    <p className='font-weight-bold '>Order Dates</p>
                                    <p>Not Selected</p>
                                </Col>

                            </Row>
                        </FormGroup>

                        <FormGroup row className='d-flex justify-content-between'>
                            <Button color="primary" className='col-2 m-1'>Download All Assets</Button>
                            <ButtonGroup className='col-9 justify-content-end'>
                                <Button color="secondary" className='col-3 m-1 rounded-right'>Edit</Button>{' '}
                                <Button color="primary" className='col-3 m-1 rounded-left'>Back</Button>
                            </ButtonGroup>
                        </FormGroup>

                    </Form>
                </div>
            </div>
        </div>
    );
}
export default CampaignDetailPage;