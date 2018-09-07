import * as Const from '../constants/page';

const initialState = {
    year: null,
    years: [],
    photos: [],
    fetching: false
};

export default function page(state = initialState, action) {
    //console.log('page', arguments)
    switch (action.type) {
        //case Const.SET_YEAR:            
        //    return { ...state, year:action.payload};
        case Const.GET_PHOTOS_REQUEST:
            return { ...state, year:action.payload, fetching: true };
        case Const.LOAD_PHOTOS_SUCCESS:
        return { ...state, fetching: false, photos: [], years: action.payload };
        case Const.GET_PHOTOS_SUCCESS:
            return { ...state, fetching: false, photos: action.payload, year:action.year };
        default:
            return state;
    }
}