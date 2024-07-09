import React, {Children, createContext, useState} from "react";
import { Keyboard, Alert } from "react-native";
import axios from "axios";
import { APIBaseUrl } from "../constants";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAuthID, updateEntryID } from "../store/accountSlice";

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {

    const dispatch = useDispatch();

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const ValidateAuthID = (entryID, authorizationID) => {

        console.log('****************/ LOGIN WAS SUCCESSFUL /********************')

        dispatch(updateAuthID(authorizationID));
        dispatch(updateEntryID(entryID));

        setUserToken(entryID)
        AsyncStorage.setItem('userLogged', "true");
        AsyncStorage.setItem('authID', authorizationID);

    }

    const ExitAuthenticatedUser = () => {
        setUserToken(null)
    }

    return(
        <AuthContext.Provider value={{
            userToken,
            ValidateAuthID,
            isLoading,
            ExitAuthenticatedUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}