import * as Const from '../constants/page';
import {getAllPhotos} from '../api';
/*
export function setYear(year) {
    return {
        type: Const.SET_YEAR,
        payload: year
    };
}
*/

let photos = null;

function setPhotos(items) {
    photos = {};
    items.forEach(item => {
        const year = new Date(item.date * 1000).getFullYear();
        if (!photos[year])
            photos[year] = [item];
        else
            photos[year].push(item);        
    });
}

function getYearsArray(year)
{
    let list = [];
    for (let year in photos) {
        list.push(year)
    }
    return list.sort();
}

export function getPhotos(year) {
    console.log('getPhotos', year)    
    return (dispatch) => {        
        console.log('getPhotos dispatch')
        if (photos == null) {
            dispatch({
                type: Const.GET_PHOTOS_REQUEST,
            });
            
            getAllPhotos()
                .then(data => {
                    console.log('getAllPhotos', data);
                    setPhotos(data.items);
                    dispatch({
                        type: Const.LOAD_PHOTOS_SUCCESS,
                        payload: getYearsArray()
                    });
                })
                .catch(error => console.log('getAllPhotos:Error', error));
        }
        else
        {
            dispatch({
                type: Const.GET_PHOTOS_SUCCESS,
                payload: photos[year] || [],
                year: year
            });
        }
/*
        setTimeout(() => 
            dispatch({
                type: Const.GET_PHOTOS_SUCCESS,
                payload: [1,2,3,4,5]
            }), 1000
        );
*/        
    }        
}