import _ from 'lodash'
import Proxy from '../proxy/Proxy'
import PreferenceStore from '../utils/PreferenceStore';
import Config from '../../config';
import {
    UPDATE_PERSON_INFO,
    ACCESS_TOKEN_ACK,
    UPDATE_CERTIFICATE,
    SET_AUTH_TRUE
} from '../constants/UserConstants';

//登录
export let doLogin = (username, password) => {

    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {

            var accessToken = null;

            Proxy.postes({
                url: Config.server + '/func/auth/webLogin',
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type': 'application/json'
                },
                body: {
                    loginName:username,
                    password:password,
                    loginType:1
                }
            }).then((json)=>{
                if(json.reCode == '1'){
                    alert("用户名不存在！")
                }else{
                    accessToken=json.sessionId
                    dispatch(updateCertificate({ username: username, password: password }));
                    dispatch(getAccessToken(accessToken));
                    PreferenceStore.put('username', username);
                    PreferenceStore.put('password', password);
                    resolve({re:1})
                }

            }).catch((e)=>{
                reject(e)
            })
        });
    }
}



//验证通过
export let setAuthTrue = () => {
    return {
        type: SET_AUTH_TRUE
    };
}

//更新凭证
export let updateCertificate = (payload) => {
    return {
        type: UPDATE_CERTIFICATE,
        payload: payload
    }
}

//更新个人信息
export let updatePersonInfo = (payload) => {
    return {
        type: UPDATE_PERSON_INFO,
        payload: payload
    }
}

//获取口令
let getAccessToken = (accessToken) => {
    if (accessToken !== null)
        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: accessToken,
            validate: true
        };
    else
        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: accessToken,
        }
}

//拉取个人培养课程成绩
export let acquirePlanCourseScores = () => {
    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {

            var state = getState();
            var accessToken = state.user.accessToken;
            Proxy.postes({
                url: Config.server + '/gradms/user',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'getNewCultivatePlanCourse',
                }
            }).then((json)=>{
                resolve(json)
            }).catch((e)=>{
                reject(e)
            })
        })
    }
}

let _onGetCourseAchievement=(payload)=>{
    return {
        type:ON_GET_COURSE_ACHIEVEMENT,
        payload
    }
}

//获取成绩
export let onGetCourseAchievement=(payload)=>{
    return (dispatch, getState) => {
        dispatch(_onGetCourseAchievement(payload))
    }
}
