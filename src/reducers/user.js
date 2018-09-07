import * as Const from '../constants/user';

const initialState = {
    name: null,
    image: null,
    error: null,
    login: false    
};

export default function user(state = initialState, action)  {
    switch(action.type) {
        case Const.LOGIN_REQUEST:
        return { ...state, name: null, image:null, error: null, login:true };
        case Const.LOGIN_SUCCESS:
            return { ...state, name: action.payload, image: action.image, error: null, login:false };
        case Const.LOGIN_FAIL:
            return { ...state, name: null, image: null, error: action.payload.error_msg, login:false };
        default:
            return state;
    }    
};