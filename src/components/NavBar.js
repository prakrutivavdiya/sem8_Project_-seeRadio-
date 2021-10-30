import React, { useState } from 'react';
import {
    Collapse, Navbar, NavbarText, NavbarToggler, NavbarBrand, Nav, NavItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaUserAlt, FaLock, FaInfoCircle, FaSignOutAlt, FaTachometerAlt, FaFire, FaAd, FaCaretDown } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import seeRadioIcon from '../assets/see_radio_logo.png';
import {useHistory} from 'react-router-dom';

const NavBar = (props) => {
    const history=useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const logout=()=>{sessionStorage.clear(); history.push(`/login`);}
    return (
        <div>
            <Navbar color="white" light expand="md">
                <NavbarBrand href="/">
                    <img src={seeRadioIcon} alt='see radio' />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                    </Nav>
                    <UncontrolledDropdown nav inNavbar className='list-unstyled'>
                        <DropdownToggle nav>
                            <IconContext.Provider
                                value={{ color: 'lightgray', size: '35px' }}>
                                <div>
                                    <FaUserCircle />
                                </div>
                            </IconContext.Provider>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <IconContext.Provider
                                    value={{ color: 'dodgerblue' }}>
                                    <div>
                                        <FaUserAlt />{' '}Profile
                                </div>
                                </IconContext.Provider>
                            </DropdownItem>
                            <DropdownItem onClick={()=>history.push('/changePassword')}>
                                <IconContext.Provider
                                    value={{ color: 'dodgerblue' }}>
                                    <div>
                                        <FaLock />{' '}Change Password
                                </div>
                                </IconContext.Provider>
                            </DropdownItem>
                            <DropdownItem>
                                <IconContext.Provider
                                    value={{ color: 'dodgerblue' }}>
                                    <div>
                                        <FaInfoCircle />{' '}Company Detail
                                </div>
                                </IconContext.Provider>
                            </DropdownItem>
                            <DropdownItem onClick={logout}>
                                <IconContext.Provider
                                    value={{ color: 'red' }}>
                                    <div className='text-danger'>
                                        <FaSignOutAlt />{' '}Sign Out
                                </div>
                                </IconContext.Provider>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavbarText className='col-lg-2 col-sm-2 text-left'>
                        <p className='font-weight-bold my-0'>Computer City</p>
                        <p className='my-0 text-primary'><small>Salesperson</small></p>
                        <p className='my-0'><small>hiralbaraiya@bacancy.com</small></p>
                    </NavbarText>

                </Collapse>
            </Navbar>


            <Navbar color="primary" className='p-0' expand="md">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <ButtonGroup>
                            <Button className='py-0' color='primary' onClick={()=>history.push('/dashboard')}>
                                <IconContext.Provider
                                    value={{ color: 'white' }}>
                                    <div>
                                        <FaTachometerAlt />{' '}Dashboard
                                        </div>
                                </IconContext.Provider>
                            </Button>
                            <Button className='py-0' color='primary'>
                                <UncontrolledDropdown nav inNavbar className='list-unstyled py-0'>
                                    <DropdownToggle nav>
                                        <IconContext.Provider
                                            value={{ color: 'white' }}>
                                            <div className='text-white'>
                                                <FaFire />{' Campaign '}<FaCaretDown />
                                            </div>
                                        </IconContext.Provider>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem  onClick={ ()=>history.push(`/videosInProduction`)}>
                                            Videos in Production
                                            </DropdownItem>
                                        <DropdownItem>
                                            Campaigns in Market
                                            </DropdownItem>
                                        <DropdownItem>
                                            Completed Campaigns
                                            </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Button>
                            <Button className='py-0' color='primary'>
                                <IconContext.Provider
                                    value={{ color: 'white' }}>
                                    <div>
                                        <FaAd />{' '}Advertisers
                                </div>
                                </IconContext.Provider>
                            </Button>
                        </ButtonGroup>
                    </NavItem>
                </Nav>
                <Button className='py-2' color='primary' onClick={ ()=>history.push(`/order`)}>
                    <IconContext.Provider
                        value={{ color: 'white' }}>
                        <div>
                            +{' '}Order
                                </div>
                    </IconContext.Provider>
                </Button>
            </Navbar>
        </div>
    );
}

export default NavBar;
