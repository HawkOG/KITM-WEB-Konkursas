import React, { Component } from 'react'
import Categories from '../components/Categories'
import axios from 'axios'
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
library.add(faBars)

export default class Recipees extends Component {
    constructor(){
        super()
        this.state = {  //SUKELIAMI VISI GAUTI API DUOMENYS
            ingredients: [],
            headers: [],
            categories: [],
            dropCats: [],
            dropIngs: [],
            dropCountries: [],
            showNav: false
        }
    }

    // IMAMI DUOMENYS IS API
    componentWillMount(){
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(response => {
            this.setState({
                dropIngs: response.data.meals
            })
            
        })
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then(response => {
            this.setState({
                dropIngs: response.data.meals
            })
            
        })
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php').then(response => {
            this.setState({
                dropCats: response.data.categories
            })
            
        })
        axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef').then(response => {
            this.setState({
                ingredients: response.data
            })
            
        })
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`).then(response => {
            this.setState({
                headers: [response.data]
            })
            console.log(response.data.meals[0].idMeal)
        })
        axios.get(`https://www.themealdb.com/api/json/v1/1/latest.php`).then(response => {
            this.setState({
                categories: [response.data]
            })
            console.log(response.data.meals[0].idMeal)
        })
    }
    // VISKAS ISVEDAMA I DOM'A
  render() {
    return (
        
        <div className="bg-light col-md-12 col-xs-12">
            {/* NAVIGACIJOS MYGTUKAS/AKTYVATORIUS */}
             <SideNav
             titleStyle={{backgroundColor: '#333'}}
            showNav = {this.state.showNav}
            title = 'Navigacija'
            items          =  {[<Link exact to='/receptai' className="active">Receptai</Link>, <a onClick={() => this.setState({showNav: false})}>Close menu</a>]}
            onHideNav = {() => this.setState({showNav: false})} />
            <button  className="navmenutoggle" onClick={() => this.setState({showNav: true})}><FontAwesomeIcon icon="bars" /></button>
            <img src="img/hr.png" className="mx-auto d-block mb-5 mt-5"/>
            
            <h1 className="mt-2 mb-5 text-center">
            RECEPTŲ PAIEŠKA
          </h1>

          {/*  */}
            <div className="form-inline mx-auto justify-content-center">
            <select className="form-control ml-2">
                {this.state.dropCats.map(item => 
                <option value="#">{item.strCategory}</option>
                )}
            </select>

            <select className="form-control">
            {this.state.dropIngs.map(item => 
                <option value="#">{item.strIngredient}</option>
                )}
            </select>

            <select className="form-control">
            {this.state.dropIngs.map(item => 
                <option value="#">{item.strArea}</option>
                )}
            </select>

            <input type="text" className="form-control w-25" placeholder="Pavadinimas"/>
            <button type="submit" className="btn btn-search">Ieškoti</button>
            </div>
            <div className="row mt-3">
            
        {/* CONTENT */}

        {this.state.headers.map(item => 
        <div className='image-container-1 mr-3'
                    style={{
                        background: `url(${item.meals[0].strMealThumb})`,
                        backgroundSize: 'cover'
                        }}><h1>{item.meals[0].strMeal}</h1></div>
        )}
        {this.state.headers.map(item => 
            <div className='image-container-1'
                        style={{
                            background: `url(${item.meals[1].strMealThumb})`,
                            backgroundSize: 'cover'
                        }}><h1>{item.meals[1].strMeal}</h1></div>
            )}
           {this.state.headers.map(item => 
        <div className='image-container-1 mr-3'
                    style={{
                        background: `url(${item.meals[2].strMealThumb})`,
                        backgroundSize: 'cover'
                    }}><h1>{item.meals[2].strMeal}</h1></div>
        )}
        {this.state.headers.map(item => 
            <div className='image-container-sm mr-3'
                        style={{
                            background: `url(${item.meals[3].strMealThumb})`,
                            backgroundSize: 'cover'
                        }}><h1>{item.meals[3].strMeal}</h1></div>
            )}
        {this.state.categories.map(item => 
            <div className='image-container-sm'
                        style={{
                            background: `url(${item.meals[4].strMealThumb})`,
                            backgroundSize: 'cover'
                        }}><h1>{item.meals[4].strMeal}</h1></div>
            )}
            {this.state.headers.map(item => 
                <div className='image-container-sm mr-3'
                            style={{
                                background: `url(${item.meals[9].strMealThumb})`,
                                backgroundSize: '200%'
                            }}><h1>{item.meals[9].strMeal}</h1></div>
                )}
            {this.state.headers.map(item => 
                <div className='image-container-sm'
                            style={{
                                background: `url(${item.meals[6].strMealThumb})`,
                                backgroundSize: '200%'
                            }}><h1>{item.meals[6].strMeal}</h1></div>
                )}
                {this.state.headers.map(item => 
        <div className='image-container-2 ml-4'
                    style={{
                        background: `url(${item.meals[7].strMealThumb})`,
                        backgroundSize: '100%'
                    }}><h1>{item.meals[7].strMeal}</h1></div>
        )}



                
            </div>
            <h1 className="text-center mt-5 mb-5">
            <img src="img/hr.png" className="mx-auto d-block mb-5 mt-5"/>
                <h1 className="mx-auto">RECEPTAI</h1>
                <button className="btn btn-dark mr-2">Naujausi</button>
                <button className="btn btn-light border">Visi</button>
                
            </h1>
            <div className="row">
                
            {/* Receptu isvedimas i ekrana naudojant API Duomenis */}

                {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[0].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[0].strMeal}</h2>
                    <p>{item.meals[0].strIngredient1}, {item.meals[0].strIngredient2}, {item.meals[0].strIngredient3}, {item.meals[0].strIngredient4}</p>
                    <p><strong>{item.meals[0].strInstructions.substr(0, 100)}</strong></p>
                    <a href={item.meals[0].strYoutube} target="_blank">Watch on YouTube</a>
                    </div>
                    </div>
                    
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[1].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[1].strMeal}</h2>
                    <p>{item.meals[1].strIngredient1}, {item.meals[1].strIngredient2}, {item.meals[1].strIngredient3}, {item.meals[1].strIngredient4}</p>
                    <p><strong>{item.meals[1].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[3].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[3].strMeal}</h2>
                    <p>{item.meals[3].strIngredient1}, {item.meals[3].strIngredient2}, {item.meals[3].strIngredient3}, {item.meals[3].strIngredient4}</p>
                    <p><strong>{item.meals[3].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[4].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[4].strMeal}</h2>
                    <p>{item.meals[4].strIngredient1}, {item.meals[4].strIngredient2}, {item.meals[4].strIngredient3}, {item.meals[4].strIngredient4}</p>
                    <p><strong>{item.meals[4].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[5].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[5].strMeal}</h2>
                    <p>{item.meals[5].strIngredient1}, {item.meals[5].strIngredient2}, {item.meals[5].strIngredient3}, {item.meals[5].strIngredient4}</p>
                    <p><strong>{item.meals[5].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[6].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                   <div class="col-md-6 pl-4">
                    <h2>{item.meals[6].strMeal}</h2>
                    <p>{item.meals[6].strIngredient1}, {item.meals[6].strIngredient2}, {item.meals[6].strIngredient3}, {item.meals[6].strIngredient4}</p>
                    <p><strong>{item.meals[6].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[7].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[7].strMeal}</h2>
                    <p>{item.meals[7].strIngredient1}, {item.meals[7].strIngredient2}, {item.meals[7].strIngredient3}, {item.meals[7].strIngredient4}</p>
                    <p><strong>{item.meals[7].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row">
                    <div class="col-md-6">
                    <img src={item.meals[8].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[8].strMeal}</h2>
                    <p>{item.meals[8].strIngredient1}, {item.meals[8].strIngredient2}, {item.meals[8].strIngredient3}, {item.meals[8].strIngredient4}</p>
                    <p><strong>{item.meals[8].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {this.state.categories.map(item => 
                <div class="carad mb-5">
                    <div class="row no-gutters">
                    <div class="col-md-6">
                    <img src={item.meals[9].strMealThumb} className="img-recipee img-fluid"/>
                    </div>
                    <div class="col-md-6 pl-4">
                    <h2>{item.meals[9].strMeal}</h2>
                    <p>{item.meals[9].strIngredient1}, {item.meals[9].strIngredient2}, {item.meals[9].strIngredient3}, {item.meals[9].strIngredient4}</p>
                    <p><strong>{item.meals[9].strInstructions.substr(0, 100)}</strong></p>
                    </div>
                    </div>
                    </div>
                    )}
                    {/* /////////////////////////////// */}
                    </div>
                    
                    {/* INGREDIENTU ISVEDIMAS NAUDOJANT API DUOMENIS*/}
                    <img src="img/hr.png" className="mx-auto d-block mb-5 mt-5"/>
                    <h1 className="mt-5 mb-5 text-center">
                        INGREDIENTAI</h1>
                    <div className="row">
                    {this.state.headers.map(item => 
                        <div className='carads'
                                    style={{
                                        background: `url(${item.meals[0].strMealThumb})`,
                                        backgroundSize: 'cover'
                                        }}><h1>{item.meals[0].strMeal}</h1></div>
                        )}
                        {this.state.headers.map(item => 
                        <div className='carads'
                                    style={{
                                        background: `url(${item.meals[1].strMealThumb})`,
                                        backgroundSize: 'cover'
                                        }}><h1>{item.meals[1].strMeal}</h1></div>
                        )}
                        {this.state.headers.map(item => 
                        <div className='carads'
                                    style={{
                                        background: `url(${item.meals[2].strMealThumb})`,
                                        backgroundSize: 'cover'
                                        }}><h1>{item.meals[2].strMeal}</h1></div>
                        )}
                        {this.state.headers.map(item => 
                        <div className='carads'
                                    style={{
                                        background: `url(${item.meals[3].strMealThumb})`,
                                        backgroundSize: 'cover'
                                        }}><h1>{item.meals[3].strMeal}</h1></div>
                        )}
                    </div>

                    {/* ISVESTOS KETURIOS KORTELES SU INGREDIENTAIS */}
            </div>



    )
  }
}














 
           