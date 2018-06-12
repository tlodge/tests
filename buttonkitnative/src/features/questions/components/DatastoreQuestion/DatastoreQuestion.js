import { Text, View, FlatList, StyleSheet, TouchableOpacity, SearchBar } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector, actionCreators as questionsActions } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const layoutstyle = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        borderStyle: "solid",
        borderColor: "#E0E0E0",
        borderBottomWidth: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        flexWrap: "wrap",
        minHeight: 50,
    },
    header: {
        flex: 1,
        height: 50,
        width: "100%",
        backgroundColor: "#2196F3",
        flexDirection: "row",
        borderStyle: "solid",
        borderColor: "#E0E0E0",
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        flexWrap: "wrap",
    },

})

class DatastoreQuestion extends React.Component {

    constructor(props) {
        super(props);
        const { current: { question } } = props;
        this.props.actions.fetchDatastoreItems(question);
    }



    render() {
        const { current: { datastoreitems } } = this.props;
        const data = (datastoreitems || []).map(d => d.data);

        const keylabels = Object.keys(data.reduce(function (acc, item) {
            item.reduce((acc, item) => {
                acc[item.label] = item.label;
                return acc;
            }, acc);

            return acc;
        }, {}));

        const width = `${Math.floor(100 / keylabels.length)}%`;
        const cellstyle = {
            width,
            textAlign: "center"
        }

        const renderHeader = () => {

            const headercellstyle = {
                color: "white",
                width,
                textAlign: "center"
            }
            const items = keylabels.map((item) => {
                return <Text style={headercellstyle}>{item}</Text>
            });
            return <View style={layoutstyle.header}>{items}></View>;
        }
        return <View>

            <FlatList
                data={data}
                renderItem={({ item, i }) => {
                    const row = item.map((d, i) => <Text key={i} style={cellstyle}>{d.type}</Text>);
                    return <View style={layoutstyle.row} >{row}</View>
                }}
                ListHeaderComponent={renderHeader()}
            />
        </View>
    }


    _answerQuestion(_answer) {
        const { question, answer = [] } = this.props;
        if (answer.indexOf(_answer) == -1) {
            this.props.answerQuestion(question.questionId, [...answer, _answer]);
        } else {
            this.props.answerQuestion(question.questionId, answer.filter(a => a != _answer));
        }
    }
}

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(questionsActions, dispatch)
}))(DatastoreQuestion);