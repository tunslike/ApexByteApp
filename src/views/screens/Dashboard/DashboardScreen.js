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
import { Loader, PurchaseCard, RebuyCard, TransCard } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DashboardScreen = ({navigation}) => {
  
  const entry_id = useSelector((state) => state.account.entry_id);
  const [greetings, setGreetings] = useState('');
  const [buyHistory, setBuyHistory] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [loading, setIsLoading] = useState(false);

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


  const loadFetchTransactions = () => {

  setIsLoading(true);

  axios.get(APIBaseUrl.developmentUrl + 'product/fetchTransactions/' + entry_id ,{},{
      headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3331'
      }
  })
  .then(response => {

      setIsLoading(false)
     
      setTransaction(response.data);
      console.log(response.data)
      
  })
  .catch(error => {
      setIsLoading(false)
      console.log(error + "1");
  });

}
   //truncate strings 
   function TruncateString (message) {
    if (message.length > 28) {
        return ' ' + message.substring(0, 28) + "...";
    }else{
        return ' ' + message;
    }
}
//end of truncate string


    //USE EFFECT
    useEffect(() => {

      //return greetings
      this.checkTimeGreetings();

      loadFetchTransactions();
  
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
          onPress={() => navigation.navigate("GiftCardCategory")}
          image={images.ebay}
          title="Buy Gift Card"
          desc="Buy gift cards with ease"
    />
    </View>

    {/* Body Component Ends */}
    
    {/* Buy Again */}

    {
      (buyHistory) &&

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

    }

    {/* Buy Again Ends here */}


      {/* Transaction History */}
      
      <View style={styles.transBox}>
            <Text style={styles.transHdr}>Recent Transactions</Text>


            {
                (transaction.length > 0) &&

                <View style={styles.transwind}> 

                {
                  transaction.map((item) => {
                    return(
                      <TransCard key={item.TRANSACTION_ID}
                      narration={TruncateString(item.NARRATION)}
                      date={moment(item.DATE_CREATED).format("DD-MMM-YYYY")}
                      amount={`${item.AMOUNT}`}
                      status={item.PAYMENT_STATUS}
                    />
                    )
                  })
                }
            </View>
            }
          

          {(transaction == '') &&

            <View style={styles.noTrans}>
                <Image source={images.nodata} 
                  style={{
                    width: wp(25), height: wp(25), resizeMode: 'contain'
                  }}
                />
                <Text style={styles.noTransTxt}>No transactions found!</Text>
                <Text style={styles.noTransTxt}>Your recent transactions will show here</Text>
            </View>
          }
      
      </View>


      {/* Transaction History ends */}
        

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  noTransTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.textBoxStrokeColor
  },
  noTrans: {
      marginTop: wp(7),
      borderRadius: wp(5),
      paddingVertical: wp(5),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.White,
      marginBottom: wp(10)
  },
  transwind: {
    marginTop: wp(1),
    marginBottom: wp(5),
    overflow: 'hidden',
    height: hp(30)
  },
  transHdr: {
    color: COLORS.ButtonTxtColor,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    marginBottom: wp(3)
  },
  transBox: {
      backgroundColor: COLORS.transBGColor,
      borderTopLeftRadius: wp(7),
      borderTopRightRadius: wp(7),
      paddingHorizontal: wp(5.5),
      marginTop: wp(3),
      height: "100%",
      paddingTop: wp(3)
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