

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import PreferenceStore from '../utils/PreferenceStore';
import {
    doLogin,
    setAuthTrue
} from '../actions/UserActions';

var { height, width } = Dimensions.get('window');

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }


    render() {
        return (
            <View style={[styles.container,{backgroundColor:'#eee'}]}>

                <Image resizeMode="stretch" source={require('../../img/bg.jpeg')} style={{width:width,height:height}}>

                    <View style={{backgroundColor:'transparent',flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image resizeMode="contain" source={require('../../img/loginLogo.png')} style={{justifyContent:'center',alignItems:'center',width:500,height:250,marginLeft:300,marginTop:50}}/>
                    </View>

                    <View style={{paddingVertical:2,paddingHorizontal:25,backgroundColor:'transparent',flex:1,alignItems:'center'}} >

                        {/*输入用户名*/}
                        <View style={{flexDirection:'row',height:45,marginBottom:10,backgroundColor:'rgba(255,255,255,0.2)',margin:10,padding:3,borderRadius:5}}>

                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4
                                        ,marginLeft:0,paddingHorizontal:2}}>
                                        <Icon size={18} name="user-o" color="#eee"></Icon>
                                    </View>


                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <FloatLabelTextInput
                                            style={{backgroundColor:'transparent'}}
                                            placeholder={"请输入用户名"}
                                            value={this.state.username}
                                            selectionColor="#ff5a5d"
                                            onChangeTextValue={(val) => {
                                    this.setState({ username: val })
                                }}
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>

                        {/*输入密码*/}
                        <View style={{flexDirection:'row',height:45,marginTop:10,backgroundColor:'rgba(255,255,255,0.2)',margin:10,padding:3,borderRadius:5}}>

                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4,
                                        paddingHorizontal:2,marginLeft:0}}>
                                        <Icon size={20} name="lock" color="#eee"></Icon>
                                    </View>

                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <FloatLabelTextInput
                                            style={{backgroundColor:'transparent'}}
                                            placeholder={"请输入密码"}
                                            value={this.state.password}
                                            selectionColor="#ff5a5d"
                                            secureTextEntry={true}
                                            onChangeTextValue={(val) => {
                                    this.setState({ password: val })
                                }}
                                        />
                                    </View>

                                </View>
                            </View>
                        </View>

                        {/*登录按钮*/}
                        <TouchableOpacity style={{flexDirection:'row',height:45,marginBottom:10,backgroundColor:'#eee',margin:10,marginTop:25,padding:3,borderRadius:5}}
                                          onPress={()=>{
                                    if (this.state.username != '' && this.state.password != '') {
                                    this.setState({ isModalVisible: true })
                                    if (this.state.username == '123')
                                        this.props.dispatch(setAuthTrue())
                                }
                                          }}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#202640',fontSize:16,fontWeight:'bold'}}>登录</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{width:width,justifyContent:'center',AlignItems:'center'}}>
                            <Text style={{width:width,justifyContent:'center',textAlign:'center',color:'#eee',fontSize:12}}>忘记密码?</Text>
                        </View>

                    </View>


                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column',paddingHorizontal:28}}>

                        <View style={{flex:1,backgroundColor:'transparent',flexDirection:'row',margin:10,marginTop:height/6}}>
                            <View style={{flex:1,height:0.8,backgroundColor:'#eee',marginTop:5}}/>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'center',color:'#eee',fontSize:12}}>
                                    还没有帐号?
                                </Text>
                            </View>
                            <View style={{flex:1,height:0.8,backgroundColor:'#eee',marginTop:5}}/>
                        </View>

                        {/*注册按钮*/}
                        <TouchableOpacity style={{flexDirection:'row',height:45,marginBottom:30,backgroundColor:'transparent',margin:10,padding:3,borderRadius:5,
                        borderWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                          }}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#eee',fontSize:16,fontWeight:'bold'}}>注册</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/*loading模态框*/}
                        <Modal isVisible={this.state.isModalVisible} style={{ padding: 0, margin: 0 }}>

                            <View style={{ flex: 1 }}>
                            </View>
                            <View style={{
                        height: 160, width: width, backgroundColor: '#fff',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                                <View>
                                    <ActivityIndicator
                                        animating={true}
                                        style={[styles.centering, { height: 80 }]}
                                        size="large" />
                                </View>

                                <TouchableOpacity style={{
                            width: 120, backgroundColor: '#0ff', height: 40, marginTop: 10,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                        }}
                                                  onPress={() => {
                                this.setState({ isModalVisible: false })
                            }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>取消</Text>

                                </TouchableOpacity>

                            </View>
                        </Modal>

                    </View>

                </Image>

            </View>

        )
    }

    componentDidMount() {
        // var username = null;
        // var password = null;
        // PreferenceStore.get('username').then((val) => {
        //     username = val
        //     return PreferenceStore.get('password');
        // }).then((val) => {
        //     password = val
        //     if (username !== undefined && username !== null && username != ''
        //         && password !== undefined && password !== null && password != '') {
        //
        //         this.setState({
        //             username: username,
        //             password: password
        //         })
        //
        //     }
        // })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0
    },
    labelInput: {
        color: '#ff5a5d',
    },
    input: {
        borderWidth: 0
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#555',
        marginLeft: 20,
        width: width * 4 / 5,
        padding: 12
    },
    linearGradient: {
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});



export default connect()(Login);
