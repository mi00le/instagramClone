import axios from 'axios'

const defaultState = {
  posts: [],
}

const types = {
  getPostsSuccess: 'user/login/success',
  getPostsFailure: 'user/login/failure',
}

export const actions = {
  getPosts: (count) =>
    dispatch =>
      axios.get(
        `http://localhost:3002/posts?limit=${count}`)
        .then(({ data }) => {
          console.log(data)
          return dispatch({
            type: types.getPostsSuccess,
            payload: data.posts
          })
        })
        .catch(() => dispatch({ type: types.getPostsFailure })),
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.getPostsSuccess: {
      return {
        ...state,
        posts: action.payload
      }
    }
    default: return state
  }
}

export default reducer
