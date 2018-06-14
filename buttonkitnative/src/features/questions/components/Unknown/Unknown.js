import { Text } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { selector } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Question from '../Question';

export default class Unknown extends Question {
    render() {
        const { current } = this.props;
        return <Text>{JSON.stringify(current.question)}</Text>
    }
}

//export default connect(selector, null, null, { withRef: true })(Unknown);