import axios from "axios";

export function getPosts(){
  return (dispatch) => {
    return axios.get(`http://localhost:3002/posts?limit=5`)
    .then(response =>{
      dispatch(getPostsSuccess(response.data))
    })
    .catch(error => {
      throw(error);
    })
  }
}

export function getPostsSuccess (data) {
  return { type: "ADD_ARTICLE", payload: data }
}
