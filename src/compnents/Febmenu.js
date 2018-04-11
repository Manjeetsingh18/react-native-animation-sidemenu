import React, { Component } from 'react';
import {
    TouchableOpacity,
    LayoutAnimation,
    ScrollView,
    StyleSheet,
    Dimensions,
    UIManager,
    Platform,
    Animated,
    ListView,
    Easing,
    Text,
    View
} from 'react-native';

const _ = require('lodash');

const { height, width } = Dimensions.get('window');
const ITEMS_PER_ROW = 3;

export default class Febmenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            cardAnimation: new Animated.Value(0),
            menuAnimation: new Animated.Value(0)
        }

        this.links = [
            'fab',
            'slide',
            'side',
            'Entries',
            'search',
            'Logout'
        ]
    }

    componentDidMount() {
        this.handleMoveCard()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ active: nextProps.active }, this.handleMoveCardStart)
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    handleMoveCardStart() {
        this.setState({ active: this.state.active }, () => this.handleMoveCard())
    }

    handleToggleMenu(selectedMenu) {
        this.props.handleToggleMenu()
        if (selectedMenu) this.props.handleChangeMenu(selectedMenu)
    }

    handleMoveCard() {
        const menuAnimationOptions = {
            toValue: this.props.active ? 1 : 0,
            duration: this.props.active ? 400 : 100,
        }
        const cardAnimationOptions = {
            toValue: this.props.active ? -150 : 0,
            easing: Easing.elastic(1.3),
            duration: 350
        }
        Animated.parallel([
            Animated.timing(this.state.menuAnimation, menuAnimationOptions),
            Animated.timing(this.state.cardAnimation, cardAnimationOptions),
        ]).start(() => this.handleMoveCardEnd());
    }

    handleMoveCardEnd() {
        console.log('Done with Animation');
        this.props.afterAnimation()
    }

    renderRow(links) {
        return links.map((name, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={[styles.linkBlock]}
                    onPress={() => this.handleToggleMenu(name)}>
                    <Text style={styles.link}>{name}</Text>
                </TouchableOpacity>
            )
        })
    }

    renderItemsInGroupsOf(count) {

        return _.chunk(this.links, ITEMS_PER_ROW).map((itemsForRow, i) => {
            return (
                <View style={styles.linkRow} key={i}>
                    {this.renderRow(itemsForRow)}
                </View>
            )
        })
    }


    renderMenu() {

        const menuStateStyles = {
            position: 'absolute',
            opacity: this.state.menuAnimation,
            bottom: 80,
            left: 20,
            width: width - 40
        }

        return (
            <Animated.View style={menuStateStyles}>
                <ScrollView
                    onLayout={this.handleRotation}
                    contentContainerStyle={styles.scrollView}>
                    {this.renderItemsInGroupsOf(ITEMS_PER_ROW)}
                </ScrollView>
            </Animated.View>
        )
    }


    render() {
        const cardAnimationStyle = {
            top: this.state.cardAnimation
        }

        return (
            <View style={styles.outer}>
                {this.renderMenu()}
                <Animated.View style={[styles.inner, cardAnimationStyle]}>
                    {this.props.children}
                </Animated.View>
                <View style={styles.btn}>
                    <TouchableOpacity
                        style={{ width: 50, height: 50 }}
                        onPress={() => this.handleToggleMenu()} />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({

    outer: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        flex: 1,
        elevation: 2,
        width: width - 40, //setting the width of our main card
    },
    btn: {
        padding: 12,
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 0,
        width: 50,
        height: 50,
        borderRadius: 40,
        elevation: 2
    },
    btnInner: {
        width: 50,
        height: 50
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    linkBlock: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        margin: 5,
        alignItems: 'center',
    },
    link: {
        fontSize: 14,
        justifyContent: 'center',
    }

});