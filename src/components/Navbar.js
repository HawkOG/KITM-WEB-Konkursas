import React from 'react'
import { BrowserRouter, Switch, NavLink } from 'react-router-dom'
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

library.add(faBars)
export default class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      showNav: false
    }
  }
  render() {
    return (
      <div>
      <div className="fixed-bottom ml-3 text-light">The Man, The Legend - Erikas  Turskis</div>
        <ul className="navbar-nav">
          
           
            
            <SideNav
            showNav = {this.state.showNav}
            title = 'Navigacija'
            items          =  {[<Link exact to='/receptai' className="active">Receptai</Link>, <a onClick={() => this.setState({showNav: false})}>Close menu</a>]}
            onHideNav = {() => this.setState({showNav: false})} />
            <button  className="navmenutoggle" onClick={() => this.setState({showNav: true})}><FontAwesomeIcon icon="bars" /></button>
 
        </ul>
    </div>
    )
  }
}
