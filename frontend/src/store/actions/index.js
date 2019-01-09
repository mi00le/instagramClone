// export function addArticle(payload) {
//   return { type: "ADD_ARTICLE", payload }
// };''
import axios from "axios";

export function addArticle(){
  return (dispatch) => {
    return axios.get(`http://localhost:3002/posts?limit=5`)
    .then(response =>{
      dispatch(addArticleSuccess(response.data))
    })
    .catch(error => {
      throw(error);
    })
  }
}

export function addArticleSuccess (data) {
  return { type: "ADD_ARTICLE", payload: data }
}
