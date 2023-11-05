import { MAKE_REQUEST, OPEN_POPUP, REQUEST_ADD_SUCCESS, REQUEST_DELETE_SUCCESS, REQUEST_GET_ALL_FAILURE, REQUEST_GET_ALL_SUCCESS, REQUEST_GET_BY_CODE_SUCCESS, REQUEST_UPDATE_SUCCESS } from "../actions/actionType"

export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}

export const getAllRequestSuccess=(data)=>{
    return{
        type:REQUEST_GET_ALL_SUCCESS,
        payload:data
    }
}

export const getAllRequestFail=(err)=>{
    return{
        type:REQUEST_GET_ALL_FAILURE,
        payload:err
    }
}

export const OpenPopup=()=>{
    return{
        type:OPEN_POPUP
    }
}

export const AddRequest=(data)=>{
    return{
        type:REQUEST_ADD_SUCCESS,
        payload:data
    }
}

export const UpdateRequest=(data)=>{
    return{
        type:REQUEST_UPDATE_SUCCESS,
        payload:data
    }
}

export const RemoveRequest=(code)=>{
    return{
        type:REQUEST_DELETE_SUCCESS,
        payload:code
    }
}

export const getbycodeSuccess=(data)=>{
    return{
        type:REQUEST_GET_BY_CODE_SUCCESS,
        payload:data
    }
}