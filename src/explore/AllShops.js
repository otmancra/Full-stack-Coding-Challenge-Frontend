import React, { Component } from 'react';
import './AllShops.css';
import { getShopsNeary, likeShop } from '../util/APIUtils'
import Alert from 'react-s-alert';
import { geolocated } from "react-geolocated";
import LoadingIndicator from '../common/LoadingIndicator';
import { ACCESS_TOKEN } from '../constants';

class AllShops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopsNeary: null,
            loading: true
        };
    }

    componentDidMount() {
        this.position()
    }

    position = async () => {
        await navigator.geolocation.getCurrentPosition(
          position =>  this.getUserLocationAndShopsNearBy(position.coords.latitude, position.coords.longitude), 
          err => console.log(err)
        );
    }

    getUserLocationAndShopsNearBy(latitude, longitude) {
        if(!this.props.isGeolocationAvailable) Alert.error('Your browser does not support Geolocation!');
        else if(!this.props.isGeolocationEnabled) Alert.error('Geolocation is not enabled!');
        Alert.success("Getting the location data!");
        //getShopsNeary(33.5882262, -7.6338096)
        getShopsNeary(latitude, longitude)
        .then(response => {
            this.setState({shopsNeary: response, loading: false})
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    handleLikeBtn(id) {
        likeShop(id)
        .then(response => {
            Alert.success("You liked "+id);
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    render() {
        if(localStorage.getItem(ACCESS_TOKEN) == null){
            this.props.history.push("/");
        }

        if(this.state.loading) {
            return <LoadingIndicator />
        }
        return (
            <div className="allshops-container">
                {
                    this.state.shopsNeary.map((shop, index) => {
                        return (
                            <div key={`tab_${index}`} className="shop-content">
                                <h1 className="shop-title">{shop.name}</h1>
                                <img className="img" src={shop.image} alt="W3Schools.com"/>
                                <div className="row">
                                    <div className="column">
                                        <button type="submit" className="btn btn-danger">Dislike</button>
                                    </div>
                                    <div className="column">
                                        <button onClick={() => this.handleLikeBtn(shop.id)} type="submit" className="btn btn-primary">Like</button>
                                    </div>    
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(AllShops); 
