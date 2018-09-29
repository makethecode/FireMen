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
    InteractionManager
} from 'react-native';


import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import DateFilter from '../utils/DateFilter';
import {
    downloadAccResource
} from '../actions/ResourceActions'
import VideoT from '../components/VideoT'
import VideoViewT from '../components/VideoViewT'
import Bridge from '../native/Bridge'


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

    //导航至原生视频组件
    navigate2VideoViewT() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'VideoViewT',
                component: VideoViewT,
                params: {

                }
            })
        }
    }



    //todo:完成课程的重新拉取
    _onRefresh() {
        this.setState({ isRefreshing: true, fadeAnim: new Animated.Value(0) });
        setTimeout(function () {
            this.setState({
                isRefreshing: false,
            });
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.bounce
                },           // Configuration
            ).start();
        }.bind(this), 1000);
    }


    renderCourses(rowData, sectionId, rowId) {

        var lineStyle = {
            flex: 1, flexDirection: 'row', padding: 2, paddingLeft: 6, paddingRight: 6,
            justifyContent: 'flex-start', backgroundColor: 'transparent'
        };

        var row = (
            <TouchableOpacity style={lineStyle} onPress={() => {

                //this.navigate2VideoViewT()
                Bridge.invokeBufferingActivity()
            }}>

                <View style={{
                    flex: 1, flexDirection: 'column', alignItems: 'flex-start', padding: 2, paddingLeft: 0,
                    borderBottomColor: '#aaa', borderBottomWidth: 1
                }}>

                    <View>
                        <Text style={{ color: '#444', fontSize: 17, padding: 2, fontWeight: 'bold' }}>
                            {rowData.courseName}
                        </Text>
                    </View>

                    <View>
                        <Text style={{ color: '#666', fontSize: 15, padding: 2, fontWeight: 'bold' }}>
                            {rowData.termId.termName}
                        </Text>
                    </View>

                </View>


            </TouchableOpacity>
        );

        return row;
    }

    render() {

        var coursesList = null
        var { courses } = this.props;

        if (courses && courses.length > 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            coursesList = (
                <ScrollView

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                >
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(courses)}
                        renderRow={this.renderCourses.bind(this)}
                    />
                </ScrollView>)
        }


        return(
            <View style={styles.container}>
                <Ionicons.ToolbarAndroid
                    actions={[
                        { title: 'Edit', iconName: 'ios-create-outline', show: 'never' },
                        { title: 'Settings', iconName: 'md-search', show: 'ifRoom' }
                    ]}
                    navIconName="md-list"
                    onIconClicked={() => {
                        if(this.props.openDrawer)
                            this.props.openDrawer()
                    }}
                    iconColor="#222"
                    style={styles.toolbar}
                    titleColor="#222"
                    title={'文学教育馆'} />


                    <View style={{flex:1,marginTop:10}}>
                        <Animated.View style={{ opacity: this.state.fadeAnim }}>
                            {coursesList}
                        </Animated.View>

                    </View>




            </View>
            )
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
