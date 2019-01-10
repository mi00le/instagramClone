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
    .catch(() => dispatch({ type: types.getUserFailure }))
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
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
    default: return state
  }
}

export default reducer
