import { combineReducers } from 'redux';
import { reducer as applyTicketSignReducer } from "../applyTicketSign/store";

export default combineReducers({
  applyTicketSignReducer,
})