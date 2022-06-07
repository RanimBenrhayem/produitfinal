import {authActions} from "../actions/authActions";
import {setRoleIntoLocalStorage, setTokenIntoLocalStorage} from "../services/localStorageService";


const authReducer = (state,action) => {
    switch (action.type) {
        case authActions.LOGGING_IN : {
            return {...state,token:action.payload.token,role:action.payload.role}
        }
        case authActions.ADD_TOKEN_AND_ROLE_TO_LOCAL_STORAGE : {
            setTokenIntoLocalStorage(state.token);
            setRoleIntoLocalStorage(state.role)
            return {...state}
        }
    }
}


export default authReducer;