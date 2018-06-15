import { Text, View, TouchableOpacity, Dimensions, FlatList, Button } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Question from '../Question';

export default class ServerFunctionQuestion extends Question {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { current, navigation } = this.props;
        const buttonId = navigation.getParam("buttonId");
        this.props.actions.callServerFunction(buttonId, current.question.questionId, current.question.values);
    }

    render() {
        const { current } = this.props;
        const { answer = null } = current;

        return <View>
            <Text> {answer ? answer : "getting data from server"} </Text>
        </View>
    }
}
