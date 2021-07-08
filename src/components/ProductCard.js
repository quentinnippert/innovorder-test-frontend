import React from 'react';

import '../styles/components/ProductCardStyle.css';

function ProductCard(props) {


    return (
        <div className="product-container">
            <img src={props.productImg} className="product-img" />
            <div className="product-info">
                {props.productName ? <p className="name-title">Nom :</p> : null}
                <p className="product-name">{props.productName}</p>
                {props.productScore ? <p className="name-title">Nutri-score :</p> : null}
                <p className={
                    props.productScore === 'a' ? 'nutri-score a-score' :
                    props.productScore === 'b' ? 'nutri-score b-score' :
                    props.productScore === 'c' ? 'nutri-score c-score' :
                    props.productScore === 'd' ? 'nutri-score d-score' :
                    props.productScore === 'e' ? 'nutri-score e-score' : null
                }>{props.productScore}</p>
            </div>
        </div>
    );
}

export default ProductCard;