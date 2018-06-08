import React, { Component, PropTypes } from 'react';
import { Button } from 'react-native';

export default class Button extends Component {

    renderButton() {
        const { onClick, button } = this.props;
        return <Button
            onPress={onClick}
            title={button.name}
        />
    }

    render() {
        return this.renderButton();
    }
}