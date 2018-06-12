import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as buttonsActions, selector } from '../..';

import ButtonsLayout from '../ButtonsLayout';
import QuestionManager from '../../../questions/components/QuestionManager';
import { Text, View, Button, AsyncStorage } from 'react-native';

//@connect(selector, (dispatch) => ({
//    actions: bindActionCreators(buttonsActions, dispatch)
//}))
class ButtonView extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        console.log("Button view - component did mount!")
        AsyncStorage.getItem('sessionToken', (err, userToken) => {
            if (err || !userToken) {
                this.props.navigation.navigate('Auth');
            } else {
                this.props.actions.fetchButtons();
            }
        });
    }

    renderActionButton(button) {
        const props = {
            buttonId: button.buttonId,
            questions: button.questions || [],
            onCancel: this.props.actions.buttonClicked,
        }
        return <QuestionManager {...props} />
    }

    renderInfoButton(button) {

        return <Button
            onPress={this.props.actions.buttonClicked}
            title={button.name}
        />
    }

    renderButton() {
        const { buttons, selectedButtonId } = this.props;

        const button = buttons.reduce((acc, btn) => {
            return btn.buttonId === selectedButtonId ? btn : acc;
        }, {});

        if (button.type === "action") {
            return this.renderActionButton(button);
        }
        else {
            return this.renderInfoButton(button);
        }
    }

    renderButtons() {

        const { buttons = [] } = this.props;

        const props = {
            buttons,
            selectCategory: this.props.actions.selectCategory,
            buttonClicked: (buttonId) => {
                this.props.navigation.push("QuestionNavigator", { buttonId, questionIndex: 0 });
                //this.props.actions.buttonClicked(buttonId);
            }
        }

        return <ButtonsLayout {...props} />
    }

    render() {

        const { selectedButtonId } = this.props;

        return (
            <View>
                {!selectedButtonId && this.renderButtons()}
                {selectedButtonId && this.renderButton()}
            </View>
        );
    }
}

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(buttonsActions, dispatch)
}))(ButtonView);