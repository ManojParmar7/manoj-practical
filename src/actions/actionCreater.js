
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getbycodeSuccess, makeRequest } from "./userActions"
import { toast } from "react-toastify";
import api from "../helper/index"
import apiList from "../helper/ApiList"

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        setTimeout(()=>{
            api.get(apiList.User).then(res => {

                const _list = res.data;
                dispatch(getAllRequestSuccess(_list));
            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
        },1000)
       
    }
}
export const getUserbycode = (code) => {
    return (dispatch) => {
        api.get(apiList.User + code).then(res => {
            const _obj = res.data;
            dispatch(getbycodeSuccess(_obj));
        }).catch(err => {
            toast.error('Failed to fetch the data')
        });
    }
}

export const createUser = (data) => {
    return (dispatch) => {
        api.post(apiList.User, data).then(res => {
            dispatch(AddRequest(data));
            toast.success('User created successfully.')
        }).catch(err => {
            toast.error('Failed to create user due to :' + err.message)
        });
    }
}

export const updateUser = (data) => {
    return (dispatch) => {
        api.put(apiList.User+data.id, data).then(res => {
            dispatch(UpdateRequest(data));
            toast.success('User updated successfully.')
        }).catch(err => {
            toast.error('Failed to update user due to :' + err.message)
        });
    }
}

export const removeUser = (code) => {
    return (dispatch) => {
        api.delete(apiList.User+code).then(res => {
            dispatch(RemoveRequest(code));
            toast.success('User Removed successfully.')
        }).catch(err => {
            toast.error('Failed to remove user due to :' + err.message)
        });
    }
}


