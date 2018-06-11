import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native'

const t = require('tcomb-form-native');

const Form = t.form.Form

const newUser = t.struct({
    email: t.String,
    token: t.String
})

const options = {
    fields: {
        email: {
            autoCapitalize: 'none',
            autoCorrect: false,
            error: 'Insert a valid email'
        },
        token: {
            autoCapitalize: 'none',
            password: true,
            autoCorrect: false
        }
    }
}

class LoginView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: {
                email: '',
                token: ''
            }
        }
    }

    componentWillUnmount() {
        this.setState = {
            value: {
                email: '',
                token: null
            }
        }
    }

    _validate = (value) => {
        return value && value.email && value.token;
    }

    _onChange = (value) => {
        this.setState({
            value
        })
    }

    _handleAdd = () => {
        const value = this.refs.form.getValue();
        // If the form is valid...


        if (this._validate(value)) {
            const data = {
                email: value.email,
                token: value.token,
            }
            // Serialize and post the data
            const json = JSON.stringify(data);
            fetch('http://127.0.0.1:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: json
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json && json.success) {
                        console.log("saving sessionToken", json.sessionToken);
                        AsyncStorage.setItem('sessionToken', json.sessionToken, () => {
                            this.props.navigation.navigate('App');
                        });
                    }
                    // Redirect to home screen
                    //this.props.navigator.pop();

                })
                .catch((error) => {
                    alert(error);
                })
                .done()
        } else {
            // Form validation error
            alert('Please fix the errors listed and try again.')
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Form
                    ref='form'
                    type={newUser}
                    options={options}
                    value={this.state.value}
                    onChange={this._onChange}
                />
                <TouchableHighlight onPress={this._handleAdd}>
                    <Text style={[styles.button, styles.greenButton]}>Login</Text>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column'
    },
    button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    greenButton: {
        backgroundColor: '#4CD964'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

module.exports = LoginView