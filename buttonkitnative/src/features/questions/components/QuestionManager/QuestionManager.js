import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector, actionCreators as questionsActions } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OptionsQuestion from '../OptionsQuestion';

const layoutstyle = StyleSheet.create({
    content: {
        flex: 1,
        height: 100,
        width: "100%",
    },
    footer: {
        flex: -1,
        height: 60,
        backgroundColor: "#d35a51",
        justifyContent: 'center',
        alignItems: 'center',
    }
})

class UsersQuestion extends React.Component {
    render() {
        return <View>
            <Text>USERS</Text>
            <Text>{JSON.stringify(this.props)}</Text>
        </View>
    }
}

class Unknown extends React.Component {
    render() {
        return <Text>{JSON.stringify(this.props)}</Text>
    }
}

const renderAs = {
    options: OptionsQuestion,
    user: UsersQuestion,
    unknown: Unknown,
}

class QuestionManager extends React.Component {

    renderQuestion() {
        const { current, navigation } = this.props;
        const buttonId = navigation.getParam("buttonId");

        const $component = renderAs[current.question.type] || renderAs["unknown"];

        const answerQuestion = (questionId, answer) => {
            this.props.actions.answerQuestion(buttonId, questionId, answer);
        }

        return <$component {...{ answerQuestion, answer: current.answer, question: current.question, navigation }} />;
    }

    render() {

        const { current, navigation } = this.props;
        const buttonId = navigation.getParam("buttonId");
        const more = current.next != navigation.getParam("questionIndex");

        return (
            <View >

                <View style={{ height: "100%" }}>
                    <View style={layoutstyle.content}>
                        {this.renderQuestion()}
                    </View>
                    {more && <TouchableOpacity onPress={() => {

                        this.props.navigation.push("QuestionNavigator", { buttonId, questionIndex: current.next || 0 });

                    }} style={layoutstyle.footer}><Text style={{ color: "white" }}>NEXT</Text></TouchableOpacity>}
                </View>
            </View>
        );
    }
}

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(questionsActions, dispatch)
}))(QuestionManager);
