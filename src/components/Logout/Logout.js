import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../store/Actions/auth'

class Logout extends Component {

    componentDidMount() {
        console.log(this.props, 'LOGOUT');

        this.props.logout()
    }

    render() {
        return (
            <Redirect to='/' />
        )

    }

}

function mapDispatchToProps(dispatch) {

    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)