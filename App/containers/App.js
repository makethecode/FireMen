
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator';

import {
    PAGE_LOGIN,
    PAGE_REGISTER,
    PAGE_PASSWORDFORGET,

} from '../constants/PageStateConstants';

import Home from './Home-fix1';
import Login from './Login';
import Charts from './Charts'

import {
    updateRootTab
}  from '../actions/TabActions';

class App extends Component {

    _createNavigatorItem(route,icon)
    {
        var component=Home;
        switch (route) {
            case '首页':
                break;
            case  '图表':
            component=Charts;
                break;
            default:
                break;
        }

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === route}
                title={route}
                titleStyle={{color:'#9e9ca3',fontSize:13}}
                selectedTitleStyle={{color:'#2478a7'}}
                renderIcon={() => <Ionicons name={icon} size={26} color="#aaa"/>}
                renderSelectedIcon={() => <Ionicons name={icon} size={26} color='#2478a7' />}
                onPress={() => {
                    this.setState({ selectedTab: route });
                    this.props.dispatch(updateRootTab({tab:route}));
                }}
                tabStyle={{backgroundColor:'transparent',}}
                onSelectedStyle={{backgroundColor:'#eeecf3',}}
            >

                <View style={{flex:1,}}>
                    <Navigator
                        initialRoute={{ name: route, component:component }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                          }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            //this.props.dispatch(updateNavigator({route:route.name,navigator:navigator}))
                            return (<Component {...route.params} navigator={navigator} />);
                          }}

                    />

                </View>
            </TabNavigator.Item>
        );
    }


    constructor(props) {
        super(props);
        this.state={
            tab:'home',
            selectedTab:props.tab.rootTab,
            name:null,

        }
    }


    render() {

        var props=this.props;
        let auth=this.props.auth;
        var {tab}=this.props
        if(auth==true)
        {

            var defaultStyle={
                backgroundColor:'#eeecf3',
                paddingBottom:5,
                paddingTop:5,
                height:55
            }

            var defaultSceneStyle={
            }

            if(tab.hidden==true)
            {
                defaultStyle.height=0
                defaultStyle.paddingBottom=0
                defaultStyle.paddingTop=0
                defaultSceneStyle.paddingBottom=0
            }


            return (

                <TabNavigator  tabBarStyle={defaultStyle} sceneStyle={defaultSceneStyle}>
                    {this._createNavigatorItem('首页','md-home')}
                    {this._createNavigatorItem('图表','md-stats')}
                </TabNavigator>
            );
        }else{

            switch(props.page.state)
            {
                case PAGE_LOGIN:
                    return (<Login/>);
                    break;
            }

        }
    }

    componentDidMount()
    {
        //TODO:fetch username and password in cache
        if(Platform.OS=='android')
        {
            //ToastAndroid.show('Awesome', ToastAndroid.SHORT);
            //NotificationAndroid.notify('你有新的apk版本等待更新')
            //UpdateAndroid.check()
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(
    (state) => ({
        tab:state.tab,
        auth:state.user.auth,
        page:state.page,
    })
)(App);
