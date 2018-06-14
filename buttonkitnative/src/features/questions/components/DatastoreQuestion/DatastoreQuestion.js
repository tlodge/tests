import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, SearchBar } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector, actionCreators as questionsActions } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Question from '../Question';

const layoutstyle = StyleSheet.create({
    header: {
        flex: 1,
        height: 50,
        width: "100%",
        backgroundColor: "#b6b6b6",
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


const _render_user = (user) => {
    if (user.status && user.status != "validated") {
        if (user.apartment && user.apartment.name) {
            return `${user.surname}, apartment ${user.apartment.name} (unregistered)`;
        }
        return `${user.surname} (unregistered)`;
    } else {

        var _userstr = ""

        if (user.surname) {
            _userstr = `${_userstr} ${user.surname}`;
        }
        if (user.apartment && user.apartment.name) {
            _userstr = `${_userstr} [${user.apartment.name}]`;
        }

        return _userstr || JSON.stringify(user, null, 4);
    }
}

const _format_obj = (obj) => {

    if (!obj.value) {
        return "no value";
        //return JSON.stringify(obj, null, 4);
    }

    var data = obj.value;



    switch (obj.type) {

        case "signature":
            return <Image source={{ width: 50, height: 50, uri: `http://localhost:8080/${data}` }} />

        case "users":
        case "user":
            return _render_user(data);

        case "ts":
            return moment(data).format('MMMM Do, hh:mm a');

        case "serverfunction":
        case "function":
            if (data.type == "list") {
                return data.value.map(function (item) {
                    return item.value;
                }).join(",");
            }
            return data.value || "";

        case "options":
            return data.join(",");

        default:
            if (data instanceof Array) {
                return data.join(",");
            }
            else if (typeof data === 'object') {
                return JSON.stringify(data, null, 4);
            } else {
                return data;
            }
    }

}
//<TouchableOpacity onPress={() => { this.props.onClick(this.props.option) }} style={optionstyle.cell}>

export default class DatastoreQuestion extends Question {

    constructor(props) {
        super(props);
        const { current: { question } } = props;
        this.props.actions.fetchDatastoreItems(question);
    }



    render() {
        const { current } = this.props;
        const { datastoreitems, answer = [] } = current;

        const data = (datastoreitems || []).map(d => { return { id: d.id, data: d.data } });

        const keylabels = Object.keys(data.reduce(function (acc, item) {
            item.data.reduce((acc, item) => {
                acc[item.label] = item.label;
                return acc;
            }, acc);

            return acc;
        }, {}));

        const width = `${Math.floor(100 / keylabels.length)}%`;

        const renderHeader = () => {

            const headercellstyle = {
                color: "black",
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
                    const rowstyle = {
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
                        backgroundColor: answer.indexOf(item.id) === -1 ? "white" : "#2196F3",
                    }
                    const cellstyle = {
                        width,
                        textAlign: "center",
                        color: answer.indexOf(item.id) === -1 ? "#424242" : "white",
                    }
                    const row = item.data.map((d, i) => <Text key={i} style={cellstyle}>{_format_obj(d)}</Text>);
                    return <TouchableOpacity onPress={() => { this._answerQuestion(item.id) }} style={rowstyle} >{row}</TouchableOpacity>
                }}
                ListHeaderComponent={renderHeader()}
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

//export default connect(selector, (dispatch) => ({
//    actions: bindActionCreators(questionsActions, dispatch)
//}), null, { withRef: true })(DatastoreQuestion);
