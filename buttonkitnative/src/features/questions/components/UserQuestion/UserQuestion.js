import { Text, View, TouchableOpacity, Dimensions, FlatList, Button } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Question from '../Question';

export default class UserQuestion extends Question {

    constructor(props) {
        super(props);
        this.state = { keys: [] }
        this._answerQuestion = this._answerQuestion.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    render() {

        const { current, apartments = [] } = this.props;
        const { answer = {} } = current;
        const filter = this.state.keys.join("");

        const users = apartments.filter(a => {
            return a.name === filter;
        }).reduce((acc, item) => {
            const users = item.users || {};

            const apartment = { name: item.name, apartmentId: item.apartmentId };

            return [...acc, ...Object.keys(users).reduce((acc, key) => {
                return [...acc, { ...users[key], apartment }];
            }, [])]
        }, []);

        const keypadprops = {
            keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            commands: [],
            keyPressed: (keys) => { this.setState({ keys }) },
        }

        return <View style={{ flex: 1 }}>
            <Keypad {...keypadprops}></Keypad>
            <View style={{ flex: -1, height: 150, backgroundColor: "white" }}>
                <FlatList
                    data={users}
                    renderItem={({ item }) => {
                        return <User selected={answer.userId === item.userId} onPress={() => this._answerQuestion(item)} user={item} />
                    }}
                />
            </View>
        </View >
    }

    _answerQuestion(item) {
        const { current } = this.props;

        this.props.answerQuestion(current.question.questionId, item);
    }
}

class User extends Component {

    render() {
        const { user, selected } = this.props;

        const rowstyle = {
            height: 50,
            borderStyle: "solid",
            borderColor: "#E0E0E0",
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: "row",
            backgroundColor: selected ? "#1976D2" : "white",
        }
        return <View style={rowstyle}>
            <View style={{ flex: 1, textAlign: "center" }}>
                <Button
                    onPress={this.props.onPress}
                    title={`${user.firstname} ${user.surname}`}
                    color={selected ? "white" : "#424242"}
                    accessibilityLabel="select a user"
                />
            </View>
            <View style={{ flex: -1, width: 50 }}><Text style={{ color: selected ? "white" : "black", textAlign: "center" }}>call</Text></View>
        </View >

    }
}
class Keypad extends Component {

    constructor(props) {
        super(props);
        this.state = { pressed: [] }
        this._keyPressed = this._keyPressed.bind(this);
    }

    _keyPressed(k) {
        const { keyPressed = (k) => { } } = this.props;
        let _pressed = this.state.pressed;

        if (k === "del") {
            _pressed = _pressed.slice(0, -1);
        } else {
            _pressed = [..._pressed, k];
        }
        this.setState({ pressed: _pressed });
        console.log(_pressed);
        keyPressed(_pressed);
    }

    render() {

        const { height, width } = Dimensions.get('window');
        const { keys = [], commands = [] } = this.props;
        const totalkeys = keys.length + [...commands, "del"].length;

        const columns = Math.ceil(Math.sqrt(totalkeys));
        const rows = Math.ceil(totalkeys / columns);
        const remainder = (columns * rows) - totalkeys;
        const padding = new Array(remainder).map(i => "");
        const _keys = [...keys, ...[...commands, "del"], ...padding];

        const w = `${Math.ceil(100 / columns)}%`;
        const h = `${Math.ceil(100 / rows)}%`;

        const rowstyle = {
            width: "100%",
            h,
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }

        const cellstyle = {
            flex: 1,
            justifyContent: "center",
            height: "100%",
            w,
            //backgroundColor: "white",
            borderStyle: "solid",
            borderColor: "white",
            borderBottomWidth: 1,
        }

        const radius = Math.ceil(width / columns * 0.6);

        const textstyle = {
            color: "white",
            textAlign: "center",
            fontSize: radius * 0.5,
        }

        const cells = _keys.map((k) => {
            return <TouchableOpacity style={cellstyle}><Text style={textstyle}>{k}</Text></TouchableOpacity>
        });

        const cols = _keys.reduce((acc, k, i) => {
            const pos = Math.floor(i / columns);
            acc[pos] = [...acc[pos] || [], k]
            return acc;
        }, []);

        const circlestyle = {
            width: radius,
            height: radius,
            borderRadius: radius,
            backgroundColor: "#1976D2",
            flex: -1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderStyle: "solid",
            borderColor: "white",
            borderWidth: 1,
        }

        const selectionstyle = {
            flex: -1,
            height: 50,
            backgroundColor: "#424242",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            width: "100%",
        }

        const selectedtextstyle = {
            color: "white",
            textAlign: "center",
            fontSize: radius * 0.5,
        }
        const keypad = cols.map((item, i) => {

            const cells = item.map((cell, i) => {

                const _cellstyle = { ...cellstyle, borderRightWidth: i == columns.length - 1 ? 0 : 1 }
                const _mod = cell ? {} : { borderWidth: 0, backgroundColor: 'transparent' };
                return < View style={_cellstyle} >
                    <TouchableOpacity onPress={() => { this._keyPressed(cell) }} style={{ ...circlestyle, ..._mod }} >
                        <Text style={textstyle}>{cell}</Text>
                    </TouchableOpacity>
                </View>
            });
            return <View style={rowstyle}>{cells}</View>
        });

        const selection = <View style={selectionstyle}><Text style={selectedtextstyle}>{this.state.pressed.join("")}</Text></View>
        return <View style={{ flex: 1 }}>
            {selection}
            {keypad}
        </View>
    }
}