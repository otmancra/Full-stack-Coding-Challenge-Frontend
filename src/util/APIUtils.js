import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getShopsNeary(latitude, longitude) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + `/api/shops/near_by?latitude=${latitude}&longitude=${longitude}`,
        method: 'GET'
    });
}

export function removeShop(shopId) {
    return request({
        url: API_BASE_URL + "/api/likes/remove/shop/"+shopId,
        method: 'DELETE',
    });
}

export function likeShop(shopId) {
    return request({
        url: API_BASE_URL + "/api/like/shop/"+shopId,
        method: 'GET',
    });
}

export function getFavoritesShops() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/liked/shops",
        method: 'GET'
    });
}

export function login(usernameOrEmail, password) {
    const loginRequest = {
        usernameOrEmail : usernameOrEmail,
        password: password,
      }
    return request({
        url: API_BASE_URL + "/api/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}