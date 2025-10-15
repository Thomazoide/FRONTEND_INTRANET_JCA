import { createContext, useEffect, useReducer, useState, type Dispatch, type FC, type ReactElement, type ReactNode, } from "react";
import { ENDPOINTS } from "~/constants/endpoints";
import { GetRequestConfig, METHODS } from "~/constants/requestsConfig";
import type { User } from "~/types/models";
import type { responsePayload, validateTokenPayload } from "~/types/payloads";

enum actionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

interface State {
    user?: User | null;
}

interface Action {
    type: actionTypes;
    payload?: User;
}

const estadoInicial: State = {
    user: null
};

export const STORAGE_KEY  ="jca.web.token"

const authReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return {...state, user: action.payload};
        case actionTypes.LOGOUT:
            localStorage.setItem(STORAGE_KEY, "");
        default:
            return state;
    }
}

async function validateSession(payload: validateTokenPayload): Promise<boolean> {
    const response: responsePayload<boolean> = await (await fetch(ENDPOINTS.loginEndpoint, GetRequestConfig(METHODS.PUT, "JSON", JSON.stringify(payload)))).json();
    if(response.error) throw new Error(response.error);
    return response.data!
}

export const AuthContext = createContext<{state: State; dispatch: Dispatch<Action>} | undefined>(undefined);

export const AuthContextProvider = ({children}: Readonly<{children: ReactNode}>): ReactElement => {
    const [state, dispatch] = useReducer(authReducer, estadoInicial);
    useEffect( () => {}, [] )
    return(
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}