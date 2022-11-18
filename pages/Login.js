import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { LoginContext } from '../context/LoginContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY_STATE = "@success";
// const STORAGE_KEY_LOGIN_PW = "@loginPw";

const Login = ({ navigation }) => { 
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [states, setStates] = useState("");
    const {login} = useContext(LoginContext);

    const loadState= async () => {
        const state = await AsyncStorage.getItem(STORAGE_KEY_STATE);
        return state;
    };

    const checkInput = async () => {
        // check with API
        // alert('I will check');
        console.log("id=> "+id+" password=> "+password);
        await login(id,password);

        const isSuccess = await loadState();

        console.log("Success?=> "+ isSuccess);

        (isSuccess == "login success")
        ? (
            navigation.navigate('Search2')
        ) : (
            alert('아이디 혹은 비밀번호를 확인해주세요!')
        )

        console.log("Success_after?=> "+ isSuccess);

        setId("");
        setPassword("");
    }

    const onChangeId = (payload) => setId(payload);
    const onChangePW = (payload) => setPassword(payload);
    
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}> SKKULAR </Text>
            <Text style={styles.slogan}> 성균인을 위한 맞춤형 장학 알림 </Text>
            <View style={styles.form}>
                <TextInput 
                    onChangeText= {onChangeId}
                    placeholder={"아이디"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={id}
                />
                <TextInput 
                    secureTextEntry
                    onChangeText = {onChangePW}
                    placeholder={"비밀번호"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={password}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={checkInput}>
                    <Text style={{...styles.Btn, backgroundColor:'grey'}}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('RegisterId')}}>          
                    <Text style={{...styles.Btn, backgroundColor:'green'}}>간편 회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '600',
        marginTop: 130,
    },
    slogan: {
        fontSize: 22,
        marginBottom: 30,
    },
    form: {
        width: '80%',
    },
    input: {
        fontSize: 15,
        backgroundColor: '#DDDDDD',
        marginVertical: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        width: '80%',
        alignItems: 'center',
        marginTop: 30,
    },
    Btn: {
        fontSize: 16,
        fontWeight: '600',
        width: 300,
        marginVertical: 7,
        paddingVertical: 10,
        textAlign: 'center',
    },
})

export default Login;