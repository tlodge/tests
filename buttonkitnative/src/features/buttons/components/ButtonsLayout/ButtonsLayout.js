import React, { Component, PropTypes } from 'react';
//import Button from '../Button';
import Category from '../Category';
import { Platform, Dimensions, StyleSheet, View, TouchableOpacity, ListView, Button, TextInput } from 'react-native';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as buttonsActions, selector } from '../..';

const rgba = () => Math.floor(Math.random() * 255);

//md red,amber,
const cdict = {
    red: "#F44336",
    amber: "#FFC107",
    lime: "#CDDC39",
    green: "#4CAF50",
    brown: "#795548",
    bluegrey: "#607D8B",
    pink: "#E91E63",
    indigo: "#3F51B5",
    blue: "#2196F3",
    orange: "#FF9800",
    yellow: "#FFEB3B",
};

const SEARCHBAR_HEIGHT = 40;
const APPBAR_HEIGHT = Header.HEIGHT;//Platform.OS === 'ios' ? 44 : 56;
const TABBAR_HEIGHT = Platform.OS === 'ios' ? 30 : 30;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

const colours = ["#7BB6A4", "#E5CF58", "#CD804A", "#445662", "#D35A51", "#3F3B3C"];
//Object.keys(cdict).map(c => cdict[c]);

const colourfor = (i) => {
    return colours[i % colours.length];
}
const rowfor = (i, cols) => Math.floor(i / cols);
const colfor = (i, cols) => i % cols;

const widthfor = (i, w, rows, cols, total) => {
    if (rowfor(i, cols) === rows - 1) {
        const remainder = (rows * cols) - total;
        const toadd = (remainder * w) / (cols - remainder);
        return w + toadd;
    }
    return w;
}

class ButtonsLayout extends Component {

    //static propTypes = {
    //    buttons: PropTypes.array.isRequired,
    // };
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        const { height, width } = Dimensions.get('window');
        this.state = { w: width, h: height }
        Dimensions.addEventListener('change', () => {
            const { height, width } = Dimensions.get('window');
            this.setState({
                w: width,
                h: height,
            });
        });
    }


    renderButtons() {

        const { filtered = [], selectedButtonId } = this.props;
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return <ListView contentContainerStyle={styles.list}
            dataSource={ds.cloneWithRows(filtered)}
            renderRow={this._renderRow}
        />
    }

    _renderRow(btn, sectionId, rowId) {

        const { filtered = [] } = this.props;
        const cols = Math.ceil(Math.sqrt(filtered.length));
        const rows = Math.ceil(filtered.length / cols);
        const { h, w } = this.state;
        const _STATUSBAR_HEIGHT = w > h ? -12 : STATUSBAR_HEIGHT;
        const bw = Math.ceil(w / cols) - 1;
        const bh = Math.ceil((h - APPBAR_HEIGHT - _STATUSBAR_HEIGHT - SEARCHBAR_HEIGHT - TABBAR_HEIGHT) / rows);

        const rowstyles = StyleSheet.create({
            row: {
                justifyContent: 'center',
                padding: 0,
                backgroundColor: colourfor(rowId),
                alignItems: 'center',
                width: widthfor(rowId, bw, rows, cols, filtered.length),
                height: bh,
            }
        })

        if (btn.layout === "button") {
            return <TouchableOpacity onPress={() => this.props.buttonClicked(btn.buttonId)}>
                <View style={rowstyles.row}>
                    <Button color="white" onPress={() => this.props.buttonClicked(btn.buttonId)} title={btn.name} />
                </View>
            </ TouchableOpacity>
        }
        else {
            props.category = btn;
            props.selectCategory = this.props.selectCategory.bind(null, btn.category);
            return <View>
                <View style={rowstyles.row} >
                    <Category key={i} {...props} />
                </View>
            </View>
        }
    }

    render() {
        const style = {
            position: 'absolute',
            width: this.props.w,
            height: this.props.h,
        }
        return <View>
            <TextInput style={styles.search} value={this.props.filter} autoCapitalize="none" placeholder="search buttons" onChangeText={(text) => this.props.actions.setFilter(text)} />
            {this.renderButtons()}
        </View>
    }
}

const styles = StyleSheet.create({
    search: {
        padding: 5,
        height: SEARCHBAR_HEIGHT,

    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "white",
        alignItems: 'flex-start',
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#CCC',
        alignItems: 'center'
    }
});

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(buttonsActions, dispatch)
}))(ButtonsLayout);