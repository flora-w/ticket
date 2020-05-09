import { combineReducers } from 'redux';
import { reducer as fillFormAssistantReducer } from "../fillFormAssistant/store";
import { reducer as fillFormCommonReducer } from "../fillFormCommon/store";
import { reducer as specialApplyReducer } from "../specialApply/store";
import { reducer as springFestivalApplyReducer } from "../springFestivalApply/store";

export default combineReducers({
  fillFormAssistantReducer,
  fillFormCommonReducer,
  specialApplyReducer,
  springFestivalApplyReducer,
})