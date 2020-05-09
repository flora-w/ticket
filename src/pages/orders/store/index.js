import { combineReducers } from 'redux';
import { reducer as allTheApplyFormReducer }  from "../allTheApplyForm/store";
import { reducer as detailsFormReducer }  from "../details/store";
import {reducer as ticketsOutReducer }  from "../tickestOut/store";
import {reducer as backChangeTicketReducer} from "../backChangeTicket/store";
import {reducer as changeWaitAffirmFormReducer} from "../changeWaitAffirmForm/store";
import {reducer as waitAffirmTicketOutReducer} from "../waitAffirmForm/store";
import {reducer as waitQuoteAgainReducer} from "../waitQuoteAgain/store"

export default combineReducers({
    allTheApplyFormReducer,
    detailsFormReducer,
    ticketsOutReducer,
    backChangeTicketReducer,
    changeWaitAffirmFormReducer,
    waitAffirmTicketOutReducer,
    waitQuoteAgainReducer
    
 
   
})