import React from 'react'
import ReactDOM from 'react-dom'
import BS from '../node_modules/bootstrap/dist/css/bootstrap.css'
import style from './style.css'
// import Navbar from './components/navbar'
import Recipees from './components/Recipees'
import Categories from './components/Categories'
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom'

ReactDOM.render(
    // Perejimas per puslapius neperkraunant
            <BrowserRouter>
            <div className="row">
                <Switch>
                    <Route exact path="/" exact component={Recipees}/>                    
                    <Route exact path="/receptai" exact component={Recipees}/> 
                                       
                    {/* <Route path="/kategorijos" component={Categories}/>   YOU DID NOT SEE THIS, BUDDY   */}
                </Switch>                
            </div>
            </BrowserRouter>
            ,document.getElementById('app'))