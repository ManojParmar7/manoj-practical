/*eslint-desable*/
import {
    MAKE_REQUEST, OPEN_POPUP,
    REQUEST_ADD_SUCCESS, REQUEST_DELETE_SUCCESS,
    REQUEST_GET_ALL_FAILURE, REQUEST_GET_ALL_SUCCESS,
    REQUEST_GET_BY_CODE_SUCCESS, REQUEST_UPDATE_SUCCESS
} from "../actions/actionType"

export const initialstate = {
    isloading: false,
    userList: [],
    userObj: {},
    errormessage: ''
}

export const UserReducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                isloading: true
            }
        case REQUEST_GET_ALL_SUCCESS:
            return {
                ...state,
                isloading: false,
                userList: action.payload
            }
        case REQUEST_GET_BY_CODE_SUCCESS:
            return {
                ...state,
                userObj: action.payload
            }
        case REQUEST_GET_ALL_FAILURE:
            return {
                ...state,
                isloading: false,
                userList: [],
                errormessage: action.payload
            }
        case OPEN_POPUP:
            return {
                ...state,
                userObj: {}
            }
        case REQUEST_ADD_SUCCESS:
            const _inputdata = { ...action.payload };
            const _maxid = Math.max(...state.userList.map(o => o.id));
            _inputdata.id = _maxid + 1;
            return {
                ...state,
                userList: [...state.userList, _inputdata]
            }
        case REQUEST_UPDATE_SUCCESS:
            const _data = { ...action.payload };
            const _finaldata = state.userList.map(item => {
                return item.id === _data.id ? _data : item
            });
            return {
                ...state,
                userList: _finaldata
            }
        case REQUEST_DELETE_SUCCESS:
            const _filterdata = state.userList.filter((data) => {
                return data.id !== action.payload
            })
            return {
                ...state,
                userList: _filterdata
            }
        default: return state;
    }
}