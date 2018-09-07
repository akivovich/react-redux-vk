export const ping = store => next => action => {
    console.log('Preform action', action.type, action.payload);
    return next(action);
};
/*
const ping = function(store) {
    return function(next) {
        return function(action) {
            console.log('ping');
            return next(action);        
        }
    }
}
*/