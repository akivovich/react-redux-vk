import * as Const from '../constants/user';
import {getUserInfo} from '../api';

export function handleLogin() {
    return (dispatch) => {
        dispatch({
            type: Const.LOGIN_REQUEST
        });
        getUserInfo()
            .then(info => {
                info = info[0];
                dispatch({
                    type: Const.LOGIN_SUCCESS,
                    payload: info.first_name,
                    image: info.photo_50
                });
            })
            .catch(error => {
                dispatch({
                    type: Const.LOGIN_FAIL,
                    error: true,                    
                    payload: error
                });                
            });
    }        
}
