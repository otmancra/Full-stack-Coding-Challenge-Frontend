import React, { Component } from 'react';
import './AllShops.css';
import { getFavoritesShops } from '../util/APIUtils'
import Alert from 'react-s-alert';
import LoadingIndicator from '../common/LoadingIndicator';
import { ACCESS_TOKEN } from '../constants';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: null,
            loading: true
        };
    }

    componentDidMount() {
        getFavoritesShops()
        .then(response => {
            this.setState({favorites: response, loading: false})
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    render() {
        const { favorites, loading } = this.state
        if(localStorage.getItem(ACCESS_TOKEN) == null){
            this.props.history.push("/");
        }

        if(loading) {
            return <LoadingIndicator />
        }
        return (
            <div className="allshops-container">
                {!favorites ?
                    favorites.map((shop, index) => {
                        return (
                            <div key={`tab_${index}`} className="shop-content">
                                <h1 className="shop-title">{shop.name}</h1>
                                <img className="img" src={shop.image} alt="W3Schools.com"/>
                                <div className="row">
                                    <div className="column">
                                        <button type="submit" className="btn btn-danger">Dislike</button>
                                    </div>
                                    <div className="column">
                                        <button type="submit" className="btn btn-primary">Like</button>
                                    </div>    
                                </div>
                            </div>
                        );
                    })
                    :
                    <div className="shop-content">
                        <h1 className="shop-title">You don't have favorites yet</h1>
                    </div>
                }
            </div>
        );
    }
}

export default Favorites; 
