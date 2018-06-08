import React, { Component, PropTypes } from 'react';
import { Button } from 'react-native';

export default class Category extends Component {

    render() {

        const { category, selectCategory } = this.props;

        return <Button
            onPress={selectCategory}
            title={category.name}
        />
    }
}