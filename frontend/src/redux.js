import store from "./store/index";
import { addArticle } from "./store/actions/index";

window.store = store;
window.addArticle = addArticle;
