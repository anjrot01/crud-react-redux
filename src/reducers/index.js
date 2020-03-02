import { combineReducers } from "redux";
import productoReducers from "./productoReducers";
import alertaReducer from "./alertaReducer";

export default combineReducers({
  productos: productoReducers,
  alerta: alertaReducer
});
