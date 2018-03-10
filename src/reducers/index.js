import {combineReducers} from 'redux'
import categoryReducer from './categoryReducers'
import postReducer from './postReducers'
import commentReducer from './commentReducers'

export default combineReducers({categoryReducer,postReducer,commentReducer})
