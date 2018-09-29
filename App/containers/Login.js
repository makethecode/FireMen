

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
var { height, width } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import PreferenceStore from '../utils/PreferenceStore';
import {
    doLogin,
    setAuthTrue
} from '../actions/UserActions';




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
            <View style={styles.container}>
                <View style={{ flex: 2, marginBottom: 0 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 25,height:70 }}>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width }}>
                        <Image source={require('../../img/FireMen.jpeg')} style={{ width: 200, height: 200 }}
                               resizeMode="stretch" />
                    </View>

                </View>

                <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'row', width: width, justifyContent: 'center' }}>

                        <View style={{ flexDirection: 'row', width: width * 5 / 6 }}>
                            <FloatLabelTextInput
                                placeholder={"username/用户名"}
                                value={this.state.username}
                                selectionColor="#ff5a5d"
                                onChangeTextValue={(val) => {
                                    this.setState({ username: val })
                                }}
                            />
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', padding: 0 }}>


                        <View style={{ flexDirection: 'row', width: width * 5 / 6 }}>
                            <FloatLabelTextInput
                                placeholder={"password/密码"}
                                value={this.state.password}
                                selectionColor="#ff5a5d"
                                secureTextEntry={true}
                                onChangeTextValue={(val) => {
                                    this.setState({ password: val })
                                }}
                            />
                        </View>
                    </View>


                    {/*登录*/}
                    <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{
                            width: width * 5 / 6, backgroundColor: '#e92640', height: 40,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                        }}
                                          onPress={() => {

                               // Bridge.jump()


                                if (this.state.username != '' && this.state.password != '') {
                                    this.setState({ isModalVisible: true })
                                    // this.props.dispatch(doLogin(this.state.username, this.state.password)).then((json) => {
                                    //     if (json.re == 1)
                                    //         this.props.dispatch(setAuthTrue())
                                    // })

                                    if (this.state.username == '123')
                                        this.props.dispatch(setAuthTrue())

                                }
                            }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>登录</Text>

                        </TouchableOpacity>
                    </View>

                    {/*注册*/}
                    <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{
                            width: width * 5 / 6, backgroundColor: '#e92640', height: 40,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                        }}
                                          onPress={() => {


                                          }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>注册</Text>

                        </TouchableOpacity>
                    </View>



                </View>



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
