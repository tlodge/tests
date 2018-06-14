import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector, actionCreators as questionsActions } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OptionsQuestion from '../OptionsQuestion';
import DatastoreQuestion from '../DatastoreQuestion';
import SignatureQuestion from '../SignatureQuestion';

import Unknown from '../Unknown';

const layoutstyle = StyleSheet.create({
    content: {
        flex: 1,
        height: 100,
        width: "100%",
    },
    footer: {

        flex: -1,
        flexDirection: 'row',
        height: 60,
        width: "100%",
        backgroundColor: "#d35a51",
    },
})

class UsersQuestion extends React.Component {
    render() {
        return <View>
            <Text>USERS</Text>
            <Text>{JSON.stringify(this.props)}</Text>
        </View>
    }
}

const wrap = (component) => {
    return connect(selector, (dispatch) => ({
        actions: bindActionCreators(questionsActions, dispatch)
    }), null, { withRef: true })(component);
}

const renderAs = {
    options: wrap(OptionsQuestion),
    datastoreitem: wrap(DatastoreQuestion),
    user: wrap(UsersQuestion),
    signature: wrap(SignatureQuestion),
    unknown: wrap(Unknown),
}



class QuestionManager extends React.Component {

    /* overidden method */
    constructor(props) {
        super(props);
        this._submitPressed = this._submitPressed.bind(this);
    }

    _submitPressed() {
        const { navigation } = this.props;
        const buttonId = navigation.getParam("buttonId");
        this.refs.current.getWrappedInstance().onSubmit(this.props.actions.submit.bind(null, buttonId));
    }

    renderQuestion() {
        const { current, navigation } = this.props;
        const buttonId = navigation.getParam("buttonId");
        console.log("current question", JSON.stringify(current.question, null, 4));
        const $component = renderAs[current.question.type] || renderAs["unknown"];

        const answerQuestion = (questionId, answer) => {
            this.props.actions.answerQuestion(buttonId, questionId, answer);
        }

        return <$component ref="current" {...{ answerQuestion, navigation }} />;
    }

    renderFooter() {

        const { current, navigation } = this.props;
        const buttonId = navigation.getParam("buttonId");
        const next = current.next != navigation.getParam("questionIndex");

        const footeritems = [
            { label: "submit", value: true /*current.complete*/, onPress: () => { this._submitPressed() } },
            { label: "next", value: next, onPress: () => this.props.navigation.push("QuestionNavigator", { buttonId, questionIndex: current.next || 0 }) },
        ]

        const filtered = footeritems.filter(i => i.value)
        const width = `${Math.floor(100 / filtered.length)}%`;

        const _itemstyle = {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            borderColor: "white",
        }
        const items = filtered.map((item, i) => {
            const itemstyle = { ..._itemstyle, borderRightWidth: i != filtered.length - 1 ? 1 : 0 }
            return <TouchableOpacity key={i} style={itemstyle} onPress={item.onPress} ><Text style={{ color: "white" }}>{item.label}</Text></TouchableOpacity>
        });

        return items.length > 0 && (<View style={layoutstyle.footer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {items}
            </View>
        </View>)
    }

    render() {
        return (
            <View >

                <View style={{ height: "100%" }}>
                    <View style={layoutstyle.content}>
                        {this.renderQuestion()}
                    </View>
                    {this.renderFooter()}

                </View>

            </View >
        );
    }
}

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(questionsActions, dispatch)
}))(QuestionManager);
