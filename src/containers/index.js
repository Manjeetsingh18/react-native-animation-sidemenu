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
    Text,
    View,
} from 'react-native';
import { Button } from 'carbon-native';
import { Febmenu, Sidemenu, Slidemenu } from '../compnents';
const { height, width } = Dimensions.get('window');

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            open: false,
            currentMenu: 'fab'
        }
    }

    handleToggleMenu(selection) {
        this.setState({ open: selection || !this.state.open });
    }

    handleChangeMenu(currentMenu) {
        this.setState({ currentMenu })
    }

    afterAnimation() {
        console.log('animated')
    }

    renderDemoText() {
        return (
            <Text style={styles.welcome}>
                Side Menu
            </Text>
        )
    }

    renderDemoButton() {
        return (
            <TouchableOpacity
                style={styles.btn}
                onPress={() => this.handleToggleMenu()}>
                <Text style={{ color: 'white' }}>Show Menu</Text>
            </TouchableOpacity>
        )
    }
    render() {

        if (this.state.currentMenu === 'fab') {
            return (
                <Febmenu active={this.state.open} afterAnimation={() => this.afterAnimation()} handleChangeMenu={(d) => this.handleChangeMenu(d)} handleToggleMenu={() => this.handleToggleMenu()}>
                    <View style={[styles.container]}>
                        {this.renderDemoText()}
                        {this.renderDemoButton()}
                    </View>
                </Febmenu>
            );
        }

        if (this.state.currentMenu === 'side') {
            return (
                <Sidemenu active={this.state.open} afterAnimation={() => this.afterAnimation()} handleChangeMenu={(d) => this.handleChangeMenu(d)} handleToggleMenu={() => this.handleToggleMenu()}>
                    <View style={[styles.container]}>
                        {this.renderDemoText()}
                        {this.renderDemoButton()}
                    </View>
                </Sidemenu>
            );
        }

        if (this.state.currentMenu === 'slide') {
            return (
                <Slidemenu active={this.state.open} afterAnimation={() => this.afterAnimation()} handleChangeMenu={(d) => this.handleChangeMenu(d)} handleToggleMenu={() => this.handleToggleMenu()}>
                    <View style={[styles.container, { borderRadius: 20 }]}>
                        <Button
                            color="primary"
                            text="Outline Button"
                            outline
                        />
                        {this.renderDemoText()}
                        {this.renderDemoButton()}
                    </View>
                </Slidemenu>
            );
        }
        if (this.state.currentMenu === 'Entries'
            || this.state.currentMenu === 'search' ||
            this.state.currentMenu === 'Logout') {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Hello</Text>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 2,
        backgroundColor: '#11c1f3',
        marginLeft: 30,
        marginRight: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 4
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});