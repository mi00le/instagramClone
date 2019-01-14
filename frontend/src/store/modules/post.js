import axios from 'axios';
import qs from 'qs';

const defaultState = {
  posts: [],
  cursor: 0,
}

const types = {
  getPostsSuccess: 'post/getPosts/success',
  getUserPostsSuccess: 'post/getUserPosts/success',
  getUserPostsFailure: 'post/getUserPosts/failure',
  getPostsFailure: 'post/getPosts/failure',
  clearPosts: 'post/clearPosts',
  uploadPostSuccess: 'post/uploadPost/sucess',
  uploadPostfailure: 'post/uploadPost/failure',
}

export const actions = {
  getPosts: (count, cursor) =>
    dispatch =>
      axios.get(
        `http://localhost:3002/posts?limit=${count}&cursor=${cursor}`)
        .then(({ data }) => {
          return dispatch({
            type: types.getPostsSuccess,
            payload: data.posts,
            total: count + cursor,
          })
        })
        .catch(() => dispatch({ type: types.getPostsFailure })),
    getUserPosts: (id) =>
      dispatch =>
        axios.get(
          `http://localhost:3002/posts?id=${id}`)
          .then(({ data }) => {
            return dispatch({
              type: types.getUserPostsSuccess,
              payload: data.posts,
            })
          })
          .catch(() => dispatch({ type: types.getUserPostsFailure })),
    clearPosts: () => {
      return {
        type: types.clearPosts,
        cursor: 0,
      }
    },
    uploadPost: (info) =>
      dispatch => {
        axios.post(
          `http://localhost:3002/posts/${info.userId}`,
          qs.stringify({
            username: info.username,
            image: info.imgUrl,
            title: info.title,
            description: info.subject,
            tags: info.tags
          }))
          .then(({ data }) => {
            return dispatch({
              type: types.uploadPostSuccess,
              payload: data.post
            })
          })
          .catch((error) => dispatch({ type: types.uploadPostfailure }))
      },
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.getPostsSuccess: {
      return {
        ...state,
        posts: state.posts.concat(action.payload),
        cursor: action.total
      }
    }
    case types.getUserPostsSuccess: {
      return {
        ...state,
        posts: action.payload,
      }
    }
    case types.clearPosts: {
      return {
        ...state,
        posts: [],
        cursor: action.cursor
      }
    }
    case types.uploadPostSuccess: {
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    }
    default: return state
  }
}

export default reducer
