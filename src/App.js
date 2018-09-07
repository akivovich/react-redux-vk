import React, { Component } from 'react';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import User from './components/User';
import Page from './components/Page';
import * as pageActions from './actions/PageActions';
import * as userActions from './actions/UserActions';

class App extends Component {  
  
  componentDidMount() {
    const {autologin} = this.props;
    console.log('componentDidMount', autologin);
    if (autologin)
      this.props.store.dispatch(userActions.handleLogin());
  }

  componentDidUpdate(prevProps) {
    //console.log('componentDidUpdate', prevProps, this.props);
    const prevUser = prevProps.user;
    if (!prevUser.name && prevUser.login) {
      const {user, page} = this.props;
      if (user.name && !user.error && !user.login)
        this.props.store.dispatch(pageActions.getPhotos(page.year));
    }
  }
  
  render() {
    const {user, page} = this.props;
    //const {setYear} = this.props.pageActions;
    const {getPhotos} = this.props.pageActions;
    const {handleLogin} = this.props.userActions;

    return (
      <div className="App">
        <User 
          name={user.name}
          image={user.image}
          handleLogin={handleLogin} 
          error={user.error}
          login={user.login}          
        />
        <Page 
          year={page.year} 
          years={page.years}
          photos={page.photos}        
          //setYear={setYear} 
          fetching={page.fetching}
          getPhotos={getPhotos}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {  
  //console.log(state)
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
