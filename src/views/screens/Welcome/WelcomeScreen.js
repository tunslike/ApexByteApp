import React, {useState, useEffect} from 'react';
import { 
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, 
    View } from 'react-native';
import axios from 'axios';
import { COLORS, FONTS, images, ReloadlyKeys } from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { updateAuthID, updateReloadlyAccessToken } from '../../../store/accountSlice';
import { useSelector } from 'react-redux';

const WelcomeScreen = ({navigation}) => {

    const access_token = useSelector((state) => state.account.reloadlyAccessToken);

    const [userLogged, setuserLogged] = useState('');
    const dispatch = useDispatch();

    // function to fetch authentication id
       const getAuthCode = () => {

        const data = {
            client_id: ReloadlyKeys.client_id,
            client_secret : ReloadlyKeys.client_secret,
            grant_type: "client_credentials",
            audience : "https://giftcards-sandbox.reloadly.com"
        }

        axios.post('https://auth.reloadly.com/oauth/token',data,{
          headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3331'
          }
        })
        .then(response => {

  
          console.log(response.data.access_token);
          dispatch(updateReloadlyAccessToken(response.data.access_token));
  
        })
        .catch(error => {
          console.log(error + "1");
        });
  
    }// end of function

  //-FUNCTION TO CHECK LOGGED USER
  const ValidatedAuthenticatedUser = async () => {
    try {
        
        let userData = await AsyncStorage.getItem('userLogged');
        let authID = await AsyncStorage.getItem('authID');

        if(userData || authID) {
        
            dispatch(updateAuthID(authID));

            console.log('user has logged in before')
            setuserLogged(userData);
            
        }else{
          console.log('New User found')
        }
        
        
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
 }
 //-END OF FUNCTION

 //USE EFFECT
 useEffect(() => {

    if(access_token == '') {

        Toast.show({
            type: 'info',
            text1: 'Loading, Please wait...',
          });
    
        getAuthCode(); 
        
    }else{
        Toast.show({
            type: 'success',
            text1: 'Configuration loaded',
          });
    }
    ValidatedAuthenticatedUser();

}, []);

  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        resizeMethod='auto'
        style={styles.welcomebg}
        source={images.welcomebg}
      >

        <View style={styles.logo}>
            <Image 
                source={images.appLogo}
                style={{
                    height: wp(20), width: wp(20), resizeMode: 'contain'
                }}
            />
            <View style={styles.txtLine}>
                <Text style={styles.mainTxt}>Apex</Text><Text style={styles.mainTxtTwo}>Byte</Text>
            </View>
        </View>

        <View style={styles.descBox}>
            <Text style={styles.title}>Buy Credit Cards & Giftcard with</Text>
        </View>
        <View style={styles.descContd}>
            <Text style={[styles.txtContd, {color: COLORS.primaryColor}]}>Ease</Text>
            <Text style={[styles.txtContd, {color: COLORS.White}]}>and</Text>
            <Text style={[styles.txtContd, {color: COLORS.primaryColor}]}>Convenience</Text>
        </View>
        <View style={styles.descWindow}>
            <Text style={styles.txtSlogan}>Experience total anonymity when making transaction</Text>
        </View>

        <View style={styles.btnWindow}>
            <TouchableOpacity 
                style={styles.btnStarted}
                onPress={() => (userLogged == 'true') ? navigation.navigate("Login") : navigation.navigate("CreateAccount")}    
            >
                {userLogged == '' &&  
                    <Text style={styles.txtBtn}>Get Started here</Text>
                }
                {userLogged != '' &&  
                    <Text style={styles.txtBtn}>Continue here</Text>
                }
            
            </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    txtBtn: {
        color: COLORS.ButtonTxtColor,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: Platform.OS === 'android' ? wp(3.4) : wp(3.8),
        textAlign: 'center'
    },
    btnStarted: {
        backgroundColor: COLORS.primaryColor,
        borderRadius: wp(4),
        paddingVertical: Platform.OS === 'android' ? wp(4) : wp(5)
    },
    btnWindow: {
        marginHorizontal: wp(4),
        marginTop: wp(13)
    },
    txtContd: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: Platform.OS === 'android' ? wp(6) : wp(7),
    },
    descContd: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(1)
    },
    title: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: Platform.OS === 'android' ? wp(7.8) : wp(8.5),
        color: COLORS.White,
        width: wp(80)
    },
    txtSlogan: {
        color: COLORS.textGray,
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: Platform.OS === 'android' ? wp(3.5) : wp(3.9),
        width: wp(72)
    },
    descWindow: {
        marginHorizontal: wp(4),
        marginTop: wp(4)
    },
    descBox: {
        marginHorizontal: wp(4),
        marginTop: wp(15),
    },
    mainTxt: {
        color: COLORS.White,
        fontFamily: FONTS.POPPINS_BOLD,
        fontSize: wp(8)
    },
    mainTxtTwo: {
        color: COLORS.primaryColor,
        fontFamily: FONTS.POPPINS_BOLD,
        fontSize: wp(8)
    },
    txtLine: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: wp(3)
    },
    logo: {
        marginTop: wp(25),
        alignItems: 'center'
    },
    welcomebg: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor
    }
})