import { Text, View, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector } from '../..';
import { connect } from 'react-redux';
import SignatureCapture from 'react-native-signature-capture';
import Question from '../Question';

let _cb;

export default class SignatureQuestion extends Question {

    constructor(props) {
        super(props);
        this._answerQuestion = this._answerQuestion.bind(this);
        this._onDragEvent = this._onDragEvent.bind(this);
        this._onSaveEvent = this._onSaveEvent.bind(this);
        this.state = { signed: false }

    }

    onSubmit(cb) {
        if (this.state.signed) {
            _cb = cb;
            this.refs["sign"].saveImage();
        } else {
            cb();
        }
    }

    componentWillMount() {
        const { current } = this.props;
        const { question, answer = [] } = current;
        this.setState({ signed: false });
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,
            // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,


            onPanResponderRelease: (evt, gestureState) => {
                //this.refs["sign"].saveImage();
            },

        });
    }

    componentWillUnmount() {
        if (this.state.signed) {
            this.refs["sign"].saveImage();
        }
    }

    render() {

        //const { question, answer = [] } = this.props;
        const { current } = this.props;
        const { question, answer = [] } = current;


        return < View {...this._panResponder.panHandlers} style={{ flex: 1, flexDirection: "column" }}>
            <View style={styles.heading} >
                <Text style={{ color: "white" }}>Please provide your signature </Text>
            </View>
            <SignatureCapture
                style={[{ flex: 1 }, styles.signature]}
                ref="sign"
                onSaveEvent={this._onSaveEvent}
                onDragEvent={this._onDragEvent}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={"portrait"} /></ View >
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



    saveSign() {
        //this.refs["sign"].saveImage();
    }

    resetSign() {
        //this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        const { current } = this.props;
        const { question } = current;
        this.props.answerQuestion(question.questionId, result);
        console.log(result);
        if (_cb) {
            _cb();
            _cb = null;
        }

    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        this.setState({ signed: true });
        console.log("dragged");
    }
}

const styles = StyleSheet.create({
    heading: {
        flex: -1,
        height: 60,
        backgroundColor: "#2196F3",
        justifyContent: 'center',
        alignItems: 'center',
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

//export default connect(selector, (dispatch) => ({

//}), null, { withRef: true })(SignatureQuestion);