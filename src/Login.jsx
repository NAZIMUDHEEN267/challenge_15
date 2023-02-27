import { Alert, Button, TextInput, View } from 'react-native'
import React, { Component } from 'react';
import auth from "@react-native-firebase/auth";
import { UserContext } from '../App';
import { getItem, setItem } from './asyncStorage';

export class Login extends Component {

    constructor(props) {
        super();

        this.state = {
            email: "",
            password: ""
        }
    }

    async signUp(callback) {
        if (this.state.email.length > 0 && this.state.password.length > 0) {
            try {
                const respond = await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                if(respond?.additionalUserInfo.isNewUser) {
                    await setItem(true);
                    await getItem()
                    .then(data => {
                        console.log(data);
                        callback({isLogin: data.logged});
                    })
                }
            } catch (error) {
                console.log(error);
            }
        } else return Alert.alert("wrong", "please fill the input");
    }

    render() {
        return (
            <UserContext.Consumer>
                {(value) => (
                    <>
                        <TextInput value={this.state.email}
                            style={{
                                width: "100%",
                                borderWidth: 1,
                                marginBottom: 20
                            }}
                            onChangeText={(text) => this.setState({
                                ...this.state, email: text
                            })} keyboardType={"email-address"} />
                        <TextInput value={this.state.password}
                            style={{
                                width: "100%",
                                borderWidth: 1,
                                marginBottom: 20
                            }}
                            onChangeText={(text) => this.setState({
                                ...this.state, password: text
                            })} textContentType={"password"} />
                        <Button title='Login' onPress={() => {
                            console.log(this.signUp(value))
                        }} />
                    </>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Login