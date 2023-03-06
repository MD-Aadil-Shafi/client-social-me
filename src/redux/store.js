import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, updateUserInfoReducer } from './reducers/authReducer'
import { getPostReducer, createUpdateDeletePostReducer } from './reducers/postReducers'
import { userListReducers, followUnfollowReducer, allUserListReducers} from './reducers/userReducers'
import {getConversatinReducer, addConversationReducer, getMessagesReducer, addMessagesReducer, getOnlineReducer} from './reducers/chatReducer'
import { notifyReducer } from './reducers/notifyReducer'

const reducer = combineReducers({
    user: userReducer,
    updateUserReducer: updateUserInfoReducer,
    getPosts: getPostReducer,
    postOperations: createUpdateDeletePostReducer,
    userList: userListReducers,
    allUserList: allUserListReducers,
    followUnfollw: followUnfollowReducer,
    getConversation: getConversatinReducer,
    addConversation: addConversationReducer,
    addMessage: addMessagesReducer,
    getMessage: getMessagesReducer,
    onlineUsers: getOnlineReducer,
    notifications: notifyReducer,
})

const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
//const store = createStore(reducer, applyMiddleware(...middleware))

export default store;