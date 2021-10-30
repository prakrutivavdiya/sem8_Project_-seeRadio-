import { Form, FormGroup, Label, Button, ButtonGroup, Col,FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFileAlt, FaMicrophone, FaClone } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Dropzone from 'react-dropzone';
import {useHistory}from 'react-router-dom';
import {fileValidationHandler} from '../../Validation/Validation';

const AddAssetsForm = (props) => {
    const history= useHistory();
    
    return (
        <div className='container my-5'>
            <p className='text-left text-primary font-weight-bold'>Add Assets</p>
            <div className='container card p-4'>
                <Form>
                    <FormGroup row>
                        <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Script File</Label>
                        <Col sm={6}>
                            <Dropzone onDrop={acceptedFiles => fileValidationHandler(acceptedFiles)} multiple={false} accept='.txt, .doc, .docx, .pdf'>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className='p-3 text-left border'>
                                        <input {...getInputProps()} multiple={false}/>
                                        <IconContext.Provider
                                            value={{ color: 'dodgerblue', size: '60px' }}>
                                            <div>
                                                <FaFileAlt />{'  Drag and drop your Script file here'}
                                            </div>
                                        </IconContext.Provider>
                                        <FormFeedback>you can drop only one script file</FormFeedback>

                                    </div>
                                )}
                            </Dropzone>
                        </Col>
                        <Col sm={1}>
                            <p className="font-weight-bold text-secondary">OR</p>
                        </Col>
                        <Col sm={4}>
                        <label htmlFor="f1" className="px-4 btn btn-secondary">Upload</label>
                        <input  id='f1' type="file" onChange={(event=>fileValidationHandler(event.target.files))} style={{visibility:'hidden'}} multiple={false} accept='.txt, .doc, .docx, .pdf'/>
                        </Col>
                    </FormGroup>


                    <FormGroup row>
                        <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Voice File</Label>
                        <Col sm={6}>
                            <Dropzone onDrop={acceptedFiles => fileValidationHandler(acceptedFiles)} multiple={false} accept='audio/*'>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className='p-3 text-left border'>
                                        <input {...getInputProps()} multiple={false}/>
                                        <IconContext.Provider
                                            value={{ color: 'dodgerblue', size: '60px' }}>
                                            <div>
                                                <FaMicrophone />{'  Drag and drop your Voice file here'}
                                            </div>
                                        </IconContext.Provider>
                                        <FormFeedback>you can drop only one script file</FormFeedback>

                                    </div>
                                )}
                            </Dropzone>
                        </Col>
                        <Col sm={1}>
                            <p className="font-weight-bold text-secondary">OR</p>
                        </Col>
                        <Col sm={4}>
                        <label htmlFor="f2" className="px-4 btn btn-secondary">Upload</label>
                        <input id='f2' style={{visibility:'hidden'}} onChange={(event=>fileValidationHandler(event.target.files))} type="file" multiple={false} accept='audio/*'/>
                        </Col>
                    </FormGroup>


                    <FormGroup row>
                        <Label className='bg-light text-muted col-12 text-left font-weight-bold'>Advertiser Assets</Label>
                        <Col sm={6}>
                            <Dropzone onDrop={acceptedFiles => fileValidationHandler(acceptedFiles)} multiple={true}>
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
                        <label htmlFor="f3" className="px-4 btn btn-secondary">Upload</label>
                        <input id='f3' onChange={(event=>fileValidationHandler(event.target.files))} multiple={true} style={{visibility:'hidden'}} type="file"/>
                        </Col>
                    </FormGroup>


                    <FormGroup row className='d-flex justify-content-between'>
                        <Button color="primary" className='col-lg-2 m-1' onClick={props.onPrev}>Back</Button>
                        <ButtonGroup className='col-lg-9 col-sm-12 justify-content-end'>
                            <Button color="secondary" className='col-lg-3 col-sm-6 m-1 rounded-right' onClick={()=>history.push('/dashboard')}>Cancel</Button>{' '}
                            <Button color="primary" className='col-lg-3 col-sm-6 m-1 rounded-left' onClick={()=>history.push('/dashboard')}>Done</Button>
                        </ButtonGroup>
                    </FormGroup>

                </Form>
            </div>
        </div>
    );
}
export default AddAssetsForm;