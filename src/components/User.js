import './user.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class User extends Component {
    getContent() {
        const {name, image, error, login} = this.props;
        if (login) 
            return "Login ...";
        
        if (error)
            return error;

        return name ? 
                <div><img alt='' className='profile-image' src={image}/><div>{`Hello, ${name}!`}</div></div>  :
                <button onClick={this.props.handleLogin}>Login</button>;

    }
    render() {
        return (
            <div>{this.getContent()}</div>
        );
    }
}

User.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    login: PropTypes.bool.isRequired
};