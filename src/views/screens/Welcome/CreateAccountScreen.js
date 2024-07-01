import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, StatusBar, Platform} from 'react-native';
import { COLORS, FONTS, icons, images } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CreateAccountScreen = ({navigation}) => {

    const [authID, setAuthID] = useState('301-3312-1000UL')
  return (
    <SafeAreaView style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
    }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logo}>
            <Image source={images.appLogo} 
            style={{
                height: wp(18), width: wp(18), borderRadius: wp(4), resizeMode: 'contain'
            }} />
        </View>

        <View style={styles.header}>
            <Text style={styles.mainTitle}>Create an Account</Text>
            <Text style={styles.mainDesc}>Use the authorization code to access your account</Text>
        </View>


        <View style={styles.authWindow}>
            <View style={styles.iconBar}>
                <Image 
                    source={icons.usericon}
                    style={{
                        height: wp(7), width: wp(7), resizeMode: 'contain', 
                        tintColor: COLORS.bgColor
                    }}
                />
            </View>
            <Text style={styles.textid}>Authentication ID has created for your account</Text>


            <View style={styles.textBox}>
                    <Text style={styles.txtAuthID}>{authID}</Text>
                    <TouchableOpacity>
                        <Image source={icons.copyText} 
                            style={{
                                height: wp(6), width: wp(6), 
                                resizeMode: 'contain', tintColor: COLORS.primaryColor
                            }}
                        />
                    </TouchableOpacity>
            </View>
            <Text style={styles.notice}>Copy and keep your authenticate ID safe</Text>

<View style={styles.btnBox}>
    <Button title="Create Account" />
</View>
        </View>

        <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => navigation.navigate("Login")}
        >
            <Text style={styles.txtLogin}>Already have an account?</Text><Text style={[styles.txtLogin, {color: COLORS.primaryColor}]}> Login here</Text>
        </TouchableOpacity>

        <ImageBackground 
        source={images.footerpix}
        resizeMethod='resize'
        style={{
            height: wp(25),
            marginTop: wp(4)
        }}
    />
      
    </SafeAreaView>
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
        marginTop: Platform.OS === 'android' ? wp(10) : wp(11),
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnBox: {
        marginTop: wp(7)
    },
    txtAuthID: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: Platform.OS === 'android' ? wp(7) : wp(7.2),
        color: COLORS.White,
        flex: 1
    },
    textBox: {
        borderColor: COLORS.textBoxStrokeColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(3.5),
        paddingVertical: Platform.OS === 'android' ? wp(2) : wp(3),
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
        width: wp(85),
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
export default CreateAccountScreen;