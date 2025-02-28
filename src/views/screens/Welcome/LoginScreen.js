import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, Alert, 
        TouchableOpacity, 
        StatusBar, 
        TextInput,
        ImageBackground,
        Platform} from 'react-native';
import axios from 'axios';
import { COLORS, FONTS, icons, images, APIBaseUrl, AppName } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, LoginTextbox, Loader } from '../../components';
import { AuthContext } from '../../../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useSelector } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginValidation = Yup.object().shape({

    authorizationID: Yup.string()
      .min(14, 'Invalid Authorization code')
      .max(14, 'Invalid Authorization code')
      .required('Authorization code is required')
})

const LoginScreen = ({navigation}) => {

    const store_authID = useSelector((state) => state.account.auth_id);
    const {ValidateAuthID} = useContext(AuthContext);
    const [loading, setIsLoading] = useState(null);

    const AuthenticateUser = (values) => {

        //data
        const data = {
            authID : values.authorizationID,
        }

        setIsLoading(true);

        axios.post(APIBaseUrl.developmentUrl + 'entry/validateAuthoriseUser',data,{
            headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3331'
            }
        })
        .then(response => {

            setIsLoading(false)

            console.log(response.data)
            ValidateAuthID(response.data.ENTRY_ID, response.data.AUTH_ID);
            
        })
        .catch(error => {
            console.log(error + "1");
            setIsLoading(false)
        });
    }

  return (
    <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-300}
        style={{
            flexGrow: 1,
            backgroundColor: COLORS.bgColor
        }}
    >
    <SafeAreaView>

    <Loader loading={loading} />

    <Formik
        initialValues={{
            authorizationID: (store_authID) ? store_authID : '',
        }}
        validationSchema={LoginValidation}
        onSubmit={values => AuthenticateUser(values)}
    >
    {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <View>
        <StatusBar barStyle="light-content" />
        <View style={styles.logo}>
            <Image source={images.appLogo} 
            style={{
                height: wp(18), width: wp(18), borderRadius: wp(4), resizeMode: 'contain'
            }} />
        </View>

        <View style={styles.header}>
            <Text style={styles.mainTitle}>Welcome back!</Text>
            <Text style={styles.mainDesc}>Log in to your account using your
            authorization ID</Text>
        </View>


        <View style={styles.authWindow}>
            <View style={styles.iconBar}>
                <Image 
                    source={icons.password}
                    style={{
                        height: wp(7), width: wp(7), resizeMode: 'contain', 
                        tintColor: COLORS.bgColor
                    }}
                />
            </View>
            <Text style={styles.textid}>Use the authentication ID to access
            your account</Text>

    
            <View style={styles.textBox}>

                    <LoginTextbox 
                        maxlength={15}
                        value={values.authorizationID}
                        onChange={handleChange('authorizationID')}
                    />
                    <TouchableOpacity
                        onPress={() => values.authorizationID == ''}
                    >
                        <Image source={icons.cancel} 
                            style={{
                                height: wp(5), width: wp(5), 
                                resizeMode: 'contain', tintColor: COLORS.primaryColor
                            }}
                        />
                    </TouchableOpacity>
            </View>
            {
                errors.authorizationID &&
                <Text style={styles.notice}>{errors.authorizationID}</Text>
            }

            {
                (store_authID) &&
                <Text style={styles.notice}>Valid Authenticate ID found!</Text>
            }
        <View style={styles.btnBox}>
            <Button
                onPress={handleSubmit} 
                title="Authorize Account" 
            />
        </View>
        </View>

        <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => navigation.navigate("CreateAccount")}
        >
            <Text style={styles.txtLogin}>New User?</Text><Text style={[styles.txtLogin, {color: COLORS.primaryColor}]}> Create account here</Text>
        </TouchableOpacity>

        <ImageBackground 
            source={images.footerpix}
            resizeMethod='resize'
            style={{
                height: wp(25),
                marginTop: wp(7)
            }}
        />
        </View>
    )}
    </Formik> 
    </SafeAreaView>
</KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    notice: {
        color: COLORS.orangeColor,
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: wp(2.8),
        marginTop: wp(2),
        textAlign: 'center',
    },
    txtLogin: {
        color: COLORS.textGray,
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.5)
    },
    btnLogin: {
        marginTop: wp(11),
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnBox: {
        marginTop: wp(10)
    },
    txtAuthID: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: Platform.OS === 'android' ? wp(6.5) : wp(7.2),
        color: COLORS.White,
        flex: 1
    },
    textBox: {
        borderColor: COLORS.textBoxStrokeColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(3.5),
        paddingVertical: Platform.OS === 'android' ? wp(0.4) : wp(3),
        paddingHorizontal: Platform.OS === 'android' ? wp(2) : wp(3),
        marginTop: wp(5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textid: {
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: wp(3.5),
        color: COLORS.textGray,
        marginTop: wp(5)
    },
    iconBar: {
        backgroundColor: COLORS.White,
        borderRadius: wp(13),
        height: wp(13),
        width: wp(13),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: wp(-6)
    },
    authWindow: {
        marginTop: wp(13),
        marginHorizontal: wp(4),
        borderRadius: wp(7),
        backgroundColor: COLORS.tabBGColor,
        padding: Platform.OS === 'android' ? wp(3) : wp(8)
    },
    mainDesc: {
        color: COLORS.textGray,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        width: wp(80),
        marginTop: wp(3)
    },
    mainTitle: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.White,
        fontSize: Platform.OS === 'android' ? wp(6) : wp(6.5)
    },
    header: {
        marginTop: wp(10),
        marginHorizontal: wp(5)
    },
    logo: {
        marginHorizontal: wp(4),
        marginTop: hp(4)
      }
})
export default LoginScreen;