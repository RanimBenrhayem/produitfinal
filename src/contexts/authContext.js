import React, { useContext, useEffect, useReducer} from "react";
import {retrieveRoleFromLocalStorage, retrieveTokenFromLocalStorage} from "../services/localStorageService";
import {authActions} from "../actions/authActions";
import reducer from "../reducers/authReducer"



const AuthContext = React.createContext(null)

const initialState = {
    token: retrieveTokenFromLocalStorage() , //recherche dans localstorage
    role: retrieveRoleFromLocalStorage(),
}

const AuthProvider = ({children}) => {
    const [state , dispatch] = useReducer(reducer , initialState ) ; //naissance d'un contexte , dispatch fontion pour changer le state a travers reducer
    const loggingIn =(token,role) => {
        dispatch({type:authActions.LOGGING_IN , payload: {token,role}}) //authaction.loggin c la fonction traitée par reducer
    }
    useEffect( ()=> {
        dispatch({type: authActions.ADD_TOKEN_AND_ROLE_TO_LOCAL_STORAGE})


    } , [state.token])

    return (
        <AuthContext.Provider
        value={{ //les valeurs exposées pour les enfants des composants
            ...state, 
            loggingIn
        }}
        >
            {children} {/*app*/}
        </AuthContext.Provider>
    )
}


export const useAuthContext = ()=>{
    return useContext(AuthContext)
}


export {AuthContext,AuthProvider}