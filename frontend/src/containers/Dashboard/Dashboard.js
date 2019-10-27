import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component{
    state = {
      display_setting: 0
    }
    

    setAccountHandler = () => this.setState({...this.state, display_setting: 0})
    setNotificationHandler = () => this.setState({...this.state, display_setting: 1})
    setMypillHandler = () => this.setState({...this.state, display_setting: 2})
    logoutHandler = () => this.props.history.push('/landing')
    
    render () {
      let display;
      switch(this.state.display_setting) {
        case 0:
          display = <p>Account Settings</p>; 
          break;
        case 1:
          display = <p>Notification Settings</p>; 
          break; 
        case 2:
          display = <p>My Pills</p>; 
          break; 
        default: display = <p>Default</p>
      }
      return(
        <div className="Dashboard">
          <button id='account-tab-button' onClick={() => this.setAccountHandler()}>AccountSettings_Tab</button>
          <button id='notification-tab-button' onClick={() => this.setNotificationHandler()}>NotificationSettings_Tab</button>
          <button id='mypill-tab-button' onClick={() => this.setMypillHandler()}>MyPill_Tab</button>
          {display} 
          <button id='logout-button' onClick={() => this.logoutHandler()}>Logout</button>
                  
          
        </div>
      ) 
    }

}
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleEdit));

export default (withRouter(Dashboard));