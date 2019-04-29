import jsonPlaceHolder from '../apis/jsonPlaceHolder';
import _ from 'lodash'; // npm install --save lodash

export const fetchPost = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');
    dispatch({type: 'FETCH_POST', payload: response.data});
};

// este codigo evita llamar varias veces Usuarios con una mismo id
export const fetchPostsandUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPost());
    // const usersId = _.uniq(_.map(getState().posts,'userId')); 
    // usersId.forEach( id => dispatch(fetchUser(id)));


    // Otra forma de hacerlo
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach( id => dispatch(fetchUser(id)) )
        .value()

};

// Con este codigo hace varios llamados repetidos a la api si se llama directamente
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});
};


// con este codigo ya no hace llamados repetidos, los guarda en _.memorize
// export const fetchUser = id => dispatch => _fetchUSer(id, dispatch);
// const _fetchUSer =  _.memoize( async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data});
// });