// 정답
import axios from "axios";
import React, {createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY_STATE = "@success";

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const saveState = async (toSave) => {
        await AsyncStorage.setItem(STORAGE_KEY_STATE, toSave);
    };
    
    const login = (username,password) => {
        axios
        .post("http://13.125.186.247:8000/common/auth/", {
            'username': username,
            'password': password,
        })
        .then(res =>{
            // let userInfo = res.data;
            console.log(res.data);
            saveState(res.data.message);
            
        })
        .catch(e=>{
            console.log(`login error ${e}`);
            saveState("login error");
        })
    }

    return (
        <LoginContext.Provider value={{login}}>
            {children}
        </LoginContext.Provider>
    );
};