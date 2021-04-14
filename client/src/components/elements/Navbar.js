import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {logout} from '../../utils/users';
import {Link} from "react-router-dom";

class Navbar extends Component {
state = {
  isOpen: false
};

componentDidMount(){
  console.log('ok',this.props.userInfo)
}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
      <MDBNavbar color="red darken-3" className="fixed-top" dark expand="md">
          <Link to="/"> <MDBNavbarBrand>
          <strong className="white-text">TheyTube</strong>
        </MDBNavbarBrand></Link>
       
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem >
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            {/* <MDBNavItem>
                  <MDBNavLink to="/channel">Channel</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/subscription">Subscription</MDBNavLink>
                </MDBNavItem>*/}

            
            
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {/* <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret style={{margin:'5px 0',padding:'0'}}>
                  <img src={this.props.profilePic} style={{margin:'0',padding:'0', width:'30px', borderRadius:'25px'}} alt=""/>
                </MDBDropdownToggle>
                <MDBDropdownMenu right  >
                  <MDBDropdownItem onClick={logout}>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navbar;