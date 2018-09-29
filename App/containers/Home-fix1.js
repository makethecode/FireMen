
import React, {Component} from 'react';

import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Alert,
    InteractionManager,
    ToolbarAndroid
} from 'react-native';


import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextInputWrapper from '../plugins/TextInputWrapper'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import DateFilter from '../utils/DateFilter';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';


import {

} from '../actions/UserActions';

var {height, width} = Dimensions.get('window');


class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1)
        }
    }


    //导航至视频
    navigate2Video() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'VideoT',
                component: VideoT,
                params: {

                }
            })
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{height:200}}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>



            </View>
        );
    }
    // _renderTitleIndicator() {
    //     return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
    // }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    componentDidMount(){

    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#eee',
        height: 56,
    }

});

const mapStateToProps = (state, ownProps) => {

    const props = {
        courses:state.user.courses,
    }

    return props
}

export default connect(mapStateToProps)(Home);
