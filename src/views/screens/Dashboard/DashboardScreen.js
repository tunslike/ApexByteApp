import React, { useContext, useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  FlatList,
  ScrollView,
  Dimensions} from 'react-native';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { PurchaseCard, RebuyCard, TransCard } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DashboardScreen = ({navigation}) => {
  
  const [greetings, setGreetings] = useState('');

  const data = [
    {id: 1, name: 'Virtual Card', cardType: 'Google Pay', amount: 100},
    {id: 2, name: 'Gift Card', cardType: 'Apple Pay', amount: 20},
    {id: 3, name: 'Gift Card', cardType: 'Google Pay', amount: 35},
    {id: 4, name: 'Virtual Card', cardType: 'Credit Card', amount: 25},
    {id: 5, name: 'Gift Card', cardType: 'Apple Pay', amount: 20},
  ]

  //return greetings
  checkTimeGreetings = () => {

      var today = new Date()
      var curHr = today.getHours()
  
      if (curHr < 12) {
        setGreetings('Good Morning')
      } else if (curHr < 18) {
        setGreetings('Good Afternoon')
      } else {
        setGreetings('Good Evening')
      }
  }


    //USE EFFECT
    useEffect(() => {

      //return greetings
      this.checkTimeGreetings();
  
    }, []);


    const renderItem = ({item}) => (
        <RebuyCard 
          name={item.name}
          amount={item.amount}
          cardType={item.cardType}
        />
    );

  return (
    <ScrollView style={{
      flexGrow: 1,
      backgroundColor: COLORS.bgColor
    }}>

    {/** Header Component */}
    <View style={styles.header}>
      <View
        style={styles.iconBox}
      >
        <Image source={icons.male_icon} 
          style={{
            height: wp(8), width: wp(8), tintColor: COLORS.primaryColor, resizeMode: 'contain'
          }}
        />
      </View>
      <View style={{flex: 1}}>
          <Text style={styles.greetings}>{greetings}</Text>
          <Text style={styles.title}>What would like to do today?</Text>
      </View>
      <TouchableOpacity>
          <Image source={icons.notification} 
            style={{
              height: wp(7), width: wp(7), resizeMode: 'contain', tintColor: COLORS.White
            }}
          />
      </TouchableOpacity>
    </View>
    {/** Header Component ends here*/}

    {/* Body Component Starts */}

    <View style={styles.purchaseList}>
        <PurchaseCard
            onPress={() => navigation.navigate("PurchaseVirtualCard")}
            image={images.mastercard}
            title="Purchase Virtual Card"
            desc="Buy virtual card for online payment"
        />
        <PurchaseCard 
          onPress={() => navigation.navigate("BuyGiftCard")}
          image={images.ebay}
          title="Buy Gift Card"
          desc="Buy gift cards with ease"
    />
    </View>

    {/* Body Component Ends */}
    
    {/* Buy Again */}

    <View style={styles.buyWindow}>

            <Text style={styles.subHdr}>Buy Again?</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
    </View>

    {/* Buy Again Ends here */}


      {/* Transaction History */}
      
      <View style={styles.transBox}>
            <Text style={styles.transHdr}>Recent Transactions</Text>

            <View style={styles.transwind}> 
                <TransCard 
                  narration="Credit Card Purchase"
                  date="01-May-2024"
                  amount="$45"
                  status="Successful"
                />
                <TransCard 
                narration="Giftcard Purchase"
                date="02-Jan-2024"
                amount="$15"
                status="Successful"
              />
            </View>
            
      </View>


      {/* Transaction History ends */}
        

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  transwind: {
    marginTop: wp(1),
    paddingBottom: wp(20)
  },
  transHdr: {
    color: COLORS.ButtonTxtColor,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5)
  },
  transBox: {
      backgroundColor: COLORS.transBGColor,
      borderTopLeftRadius: wp(7),
      borderTopRightRadius: wp(7),
      paddingHorizontal: wp(5.5),
      marginTop: wp(3),
      height: "100%",
      paddingVertical: wp(3)
  },
  subHdr: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.textGray,
    fontSize: Platform.OS === 'android' ? wp(3.2) : wp(3.8),
    marginBottom: Platform.OS === 'android' ? wp(0.3) : wp(2),
    marginLeft: wp(2)
  },
  buyWindow: {
    marginHorizontal: wp(4)
  },
  purchaseList: {
    marginHorizontal: wp(4),
    marginTop: wp(3)
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.5)
  },
  greetings: {
    color: COLORS.textBoxStrokeColor,
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(3.2)
  },
  iconBox: {
    backgroundColor: COLORS.backBtnBG,
    borderRadius: wp(3),
    padding: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: COLORS.tabBGColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? wp(3) : wp(15),
    paddingHorizontal: wp(4),
    paddingBottom: Platform.OS === 'android' ? wp(1) : wp(3),
    borderBottomRightRadius: wp(7),
    borderBottomLeftRadius: wp(7),
    columnGap: wp(3)
  }
})
export default DashboardScreen;