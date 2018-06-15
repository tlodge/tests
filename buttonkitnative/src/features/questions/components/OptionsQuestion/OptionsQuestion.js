import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector } from '../..';
import { connect } from 'react-redux';
import Question from '../Question';

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

class Option extends Question {

    render() {
        const optionstyle = StyleSheet.create({
            cell: {
                justifyContent: 'center',
                backgroundColor: this.props.selected ? "#1976D2" : "white",
                padding: 0,
                alignItems: 'center',
                width: "100%",
                height: 50,
                borderStyle: "solid",
                borderColor: "#E0E0E0",
                borderBottomWidth: 1,
            },

            celltext: {
                color: this.props.selected ? "white" : "#424242",
            }
        })

        return <TouchableOpacity onPress={() => { this.props.onClick(this.props.option) }} style={optionstyle.cell}>
            <Text style={optionstyle.celltext}>{this.props.option}</Text>
        </TouchableOpacity>
    }
}

export default class OptionsQuestion extends React.Component {

    constructor(props) {
        super(props);
        this._answerQuestion = this._answerQuestion.bind(this);
    }

    render() {

        //const { question, answer = [] } = this.props;
        const { current } = this.props;
        const { question, answer = [] } = current;
        const { values: { options } } = question;
        const data = options.map(item => {
            return { key: item, selected: answer.indexOf(item) != -1 }
        });

        return <View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return <Option onClick={this._answerQuestion} option={item.key} selected={item.selected} />
                }}
            />
        </View>
    }

    _answerQuestion(_answer) {
        const { current } = this.props;
        const { question, answer = [] } = current;
        if (answer.indexOf(_answer) == -1) {
            this.props.answerQuestion(question.questionId, [...answer, _answer]);
        } else {
            this.props.answerQuestion(question.questionId, answer.filter(a => a != _answer));
        }
    }
}

/*export default connect(selector, (dispatch) => ({

}), null, { withRef: true })(OptionsQuestion);*/