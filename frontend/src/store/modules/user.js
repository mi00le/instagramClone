import axios from 'axios'
import qs from 'qs'

if (window.localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
}

const defaultState = {
  id: window.localStorage.getItem('id') || null,
  name: '',
  auth: false,
}

const types = {
  loginSuccess: 'user/login/success',
  loginFailure: 'user/login/failure',
  getUserSuccess: 'user/get/success',
  getUserFailure: 'user/get/failure',
  logout : 'user/logout',
  registerSuccess : 'user/register/success',
  registerFailure : 'user/register/failure'

}

export const actions = {
  login: ({ email, password }) =>
    dispatch =>
      axios.post(
        "http://localhost:3002/users/auth",
        qs.stringify({ email, password }),
      ).then(({ data }) =>
        dispatch({
          type: types.loginSuccess,
          payload: data,
        }))
        .catch(() => dispatch({ type: types.loginFailure })),

  getUser: id => dispatch => axios.get(`http://localhost:3002/users/${id}`)
    .then(({ data }) => dispatch({ type: types.getUserSuccess, payload: data }))
    .catch(() => dispatch({ type: types.getUserFailure })),
    logout : () => ({ type: types.logout }),

    register : (input) =>
      dispatch =>
      axios.post("http://localhost:3002/users", qs.stringify( input ))
        .then((res) =>
      dispatch({
          type : types.registerSuccess,
          payload : res.data
        })
        ).catch((err) =>
          dispatch({ type : types.registerFailure})),

}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.registerSuccess :
    case types.loginSuccess: {
      axios.defaults.headers.common['Authorization'] = action.payload.token
      window.localStorage.setItem('token', action.payload.token)
      window.localStorage.setItem('id', action.payload.auth.user.id)
      return {
        ...state,
        auth: true,
        id: action.payload.auth.user.id,
        displayName: action.payload.auth.user.displayName,
      }
    }
    case types.getUserSuccess: {
      return {
        ...state,
        auth: true,
      }
    }
    case types.logout : {
      window.localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      return {
        ...state,
        auth : false,
        id : null,
      }

    }
    case types.registerFailure : {
      console.log(action);
      return state
    }
    default: return state
  }
}

export default reducer
