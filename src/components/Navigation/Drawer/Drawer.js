import React, { Component } from 'react'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'


class Drawer extends Component {

  clickHandler = () => {

    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          > {link.label}</NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      { to: '/', exact: true, label: 'List' }
    ]


    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', exact: false, label: 'Create Test' });
      links.push({ to: '/logout', exact: false, label: 'Logout' });
    } else {

      links.push({ to: '/auth', exact: false, label: 'Authentication' })

    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer