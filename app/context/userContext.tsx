import { jwtDecode, type JwtPayload } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ActionDispatch, type Dispatch, type FC, type ReactElement, type ReactNode, } from "react";
import { ENDPOINTS } from "~/constants/endpoints";
import { GetRequestConfig, METHODS } from "~/constants/requestsConfig";
import type { User } from "~/types/models";
import type { responsePayload, validateTokenPayload } from "~/types/payloads";

export enum actionTypes {
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

export const STORAGE_KEY  ="jca.web.token";

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
    const checkAccessToken = async function() {
        const token = localStorage.getItem(STORAGE_KEY);
        if(token){
            const body: validateTokenPayload = {
                token
            }
            const result = await validateSession(body);
            if(!result){
                dispatch({type: actionTypes.LOGOUT});
                return;
            }
            const decodedToken: User = JSON.parse(jwtDecode<JwtPayload>(token).sub!);
            dispatch({type: actionTypes.LOGIN, payload: decodedToken});
        }
        dispatch({type: actionTypes.LOGOUT});
        return;
    }
    useEffect( () => {
        checkAccessToken();
    }, [] )
    const memoizedValue = useMemo<{
        state: State,
        dispatch: ActionDispatch<[action: Action]>
    }>( () => ({
        state,
        dispatch
    }), [state, dispatch] )
    return(
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("Este hook debe usarse dentro de las etiquetas del provider");
    }
    return context;
}