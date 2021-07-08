import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import '../styles/components/NavBarStyle.css';


function NavBar(props) {

    const handleLogout = () => {
        props.onLogout();
        props.logout();
    }

    return (
        <div className="nav-container">
            <p className="nav-title">Innovorder <span className="test">Test</span></p>
            <div className="menu-items">
                <FontAwesomeIcon icon={faPowerOff} size="2x" className="icon-nav" onClick={() => handleLogout()}/>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
      onLogout: function () {
        dispatch({ type: 'LOGOUT' })
      }
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(NavBar);
  