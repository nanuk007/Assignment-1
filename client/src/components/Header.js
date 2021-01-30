import React, { Component } from 'react';
import {connect}  from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    
    render() {
        console.log(this.props);
        return (
            <nav>
            <div className="nav-wrapper">
              <Link 
              to={this.props.auth ?'/dashboard':'/'} 
              className="left brand-logo"
              >
                  Assignment-1
              </Link>
              <ul className="right ">
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
          
              </ul>
            </div>
          </nav>
        );
    }
}

function mapStatetoProps({auth}){

    return{auth};
}

export default connect(mapStatetoProps)(Header);