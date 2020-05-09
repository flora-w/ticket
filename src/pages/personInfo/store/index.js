import { combineReducers } from 'redux';
import { reducer as personInfoMaintain } from '../personInfoMaintain/store';
import { reducer as familyInfoMaintain } from '../familyInfoMaintain/store';
import { reducer as commonPeopleMaintain } from '../commonPersonMaintain/store';

export default combineReducers({
  personInfoMaintain,
  familyInfoMaintain,
  commonPeopleMaintain
})