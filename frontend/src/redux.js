import store from "./store/index";
import { getPosts } from "./store/actions/index";

window.store = store;
window.addArticle = getPosts;
