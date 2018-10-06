import React, { Component } from 'react'import {    StyleSheet,    View,    Text,    Platform,    Image,    TouchableOpacity,    Animated,    Dimensions} from 'react-native'import Echarts from 'react-native-web-echarts'const {height,width} = Dimensions.get('window');export default class MapView extends Component {    constructor(props) {        super(props);        this.state = {            // gaugeValue:0,        }    }    render(){            var option = {                title: {                    text: '获取地图缩放事件的例子',                    subtext:'data-visual.cn',                    sublink:'http://data-visual.cn',                    left: 'center'                },                series: [                    {                        name: 'iphone3',                        type: 'map',                        mapType: 'china',                        roam: true,                        label: {                            normal: {                                show: true                            },                            emphasis: {                                show: true                            }                        },                        data:[                            {name: '北京',value: 1 },                            {name: '天津',value: 2 },                            {name: '上海',value: 3 },                            {name: '重庆',value: 4 },                            {name: '河北',value: 5 },                            {name: '河南',value: 6 },                            {name: '云南',value: 7 },                            {name: '辽宁',value: 8 },                            {name: '黑龙江',value:9 },                            {name: '湖南',value: 10 },                            {name: '安徽',value: 11 },                            {name: '山东',value: 12 },                            {name: '新疆',value: 13 },                            {name: '江苏',value: 14 },                            {name: '浙江',value: 15 },                            {name: '江西',value: 16 },                            {name: '湖北',value: 17 },                            {name: '广西',value: 18 },                            {name: '甘肃',value: 19 },                            {name: '山西',value: 20 },                            {name: '内蒙古',value: 21 },                            {name: '陕西',value: 22 },                            {name: '吉林',value: 23 },                            {name: '福建',value: 24 },                            {name: '贵州',value: 25 },                            {name: '广东',value: 26 },                            {name: '青海',value: 27 },                            {name: '西藏',value: 28 },                            {name: '四川',value: 29 },                            {name: '宁夏',value: 30 },                            {name: '海南',value: 31 },                            {name: '台湾',value: 32 },                            {name: '香港',value: 33 },                            {name: '澳门',value: 34 }                        ]                    }                ]            };        return(            <View style={{width:width,height:height,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>                <Echarts                    option={option}                    height={height}                    width={width}                />            </View>        )    }}