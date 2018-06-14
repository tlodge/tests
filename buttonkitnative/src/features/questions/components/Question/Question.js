import React, { Component, PropTypes } from 'react';
import { selector, actionCreators as questionsActions } from '../..';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Question extends React.Component {
    onSubmit(cb) {
        console.log("default callback!");
        cb();
    }
}