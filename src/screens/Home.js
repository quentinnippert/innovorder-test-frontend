import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar';
import IP_DEV from '../IP';
import '../styles/HomeStyle.css';

function Home(props) {

    const [bar_Code, set_Bar_Code] = useState('');
    const [is_Logged, set_Is_Logged] = useState(true);

    const [product, set_Product] = useState({});
    const [error, set_Error] = useState('');

    useEffect(() => {
        if (!props.tokenDisplay) {
            set_Is_Logged(false);
        };
    }, [])

    const handleSearch = async () => {
        let rawResponse = await fetch(`${IP_DEV}:3001/products/${bar_Code}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${props.tokenDisplay}`
            })
        });
        let response = await rawResponse.json();
        if(response.status === 0) {
            set_Error(response.status_verbose);
        } else if (response.status === 1){
            set_Product({
                name: response.product.product_name,
                img: response.product.image_url,
                ingredients: response.product.ingredients,
                score: response.product.nutrition_grade_fr
            })
        }
    }

    const handleLogout = () => {
        set_Is_Logged(false);
    }

    if (is_Logged === false) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <div className="home-container">
                <NavBar logout={handleLogout}/>
                <h1 className="home-title">Search a product</h1>
                <div className="search-container">
                    <input className="input-search" type="text" placeholder="Bar code" onChange={e => set_Bar_Code(e.target.value)}></input>
                    <button className="validation-search" onClick={() => handleSearch()}>Search</button>
                    {error !== '' ? <p className="error">{error}</p> : null}
                </div>
                {product !== {} ?
                    <ProductCard
                        productName={product.name}
                        productImg={product.img}
                        productIngredients={product.ingredients}
                        productScore={product.score}
                    /> : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { tokenDisplay: state.token }
}

export default connect(
    mapStateToProps,
    null
)(Home);