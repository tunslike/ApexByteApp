import React, {Children, createContext, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const ValidateCustomerLogin = (authorizationID) => {
        setUserToken(authorizationID)
        AsyncStorage.setItem('userLogged', "true");
    }

    const ExitAuthenticatedUser = () => {
        setUserToken(null)
    }

    return(
        <AuthContext.Provider value={{
            userToken,
            ValidateCustomerLogin,
            isLoading,
            ExitAuthenticatedUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}