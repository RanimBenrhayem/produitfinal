import React, { useContext, useEffect, useReducer} from "react";
import {retrieveRoleFromLocalStorage, retrieveTokenFromLocalStorage} from "../services/localStorageService";
import {authActions} from "../actions/authActions";
import reducer from "../reducers/authReducer"



const AuthContext = React.createContext(null)

const initialState = {
    token: retrieveTokenFromLocalStorage() ,
    role: retrieveRoleFromLocalStorage(),
}

const AuthProvider = ({children}) => {
    const [state , dispatch] = useReducer(reducer , initialState ) ;
    const loggingIn =(token,role) => {
        dispatch({type:authActions.LOGGING_IN , payload: {token,role}})
    }
    useEffect( ()=> {
        dispatch({type: authActions.ADD_TOKEN_AND_ROLE_TO_LOCAL_STORAGE})


    } , [state.token])

    return (
        <AuthContext.Provider
        value={{
            ...state,
            loggingIn
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = ()=>{
    return useContext(AuthContext)
}


export {AuthContext,AuthProvider}