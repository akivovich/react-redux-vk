import $ from 'jquery';

let access_token = null;
const baseUrl = "https://api.vk.com/method/";
const app_id = 6680667;
const authUrl = `https://oauth.vk.com/authorize?client_id=${app_id}&display=page&redirect_uri=http://localhost:3000/&response_type=token&scope=friends,photos,video&v=5.52`;

const baseParams = {
    v: "5.52"     
};

function createUrl(method, params) {
    params = params || {};
    params.access_token = access_token;
    params = $.extend(params, baseParams);
    const url = baseUrl + method + '?' + $.param(params);
    console.log('request url', url);
    return url;
}

function sendRequest(url) {
    console.log('sendRequest')
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "JSONP",
            success: data => {
                console.log('request success', data);
                if (data.error)
                    reject(data.error);
                else
                    resolve(data.response);
            },
            error: error => reject(error)
        });
    });
}

function getAccessToken() {
    const url = window.location.href;
    const parts = url.split('access_token=');
    return (parts.length < 2) ? null : parts[1].split('&')[0];
}

export function setAccessTokenFromUrl() {
    access_token = getAccessToken();
    return !!access_token;
}

//photos.getAll
//users.get
export function getUserInfo() {    
    
    if (!(access_token || setAccessTokenFromUrl())) {
        window.location.href = authUrl;
        return new Promise((resolve, reject) => { reject(new Error()) });
    }         

    const url = createUrl("users.get", {fields: 'photo_50'});
    return sendRequest(url);
}

export function getAllPhotos() {
    const url = createUrl("photos.getAll", {count: 200});
    return sendRequest(url);
}