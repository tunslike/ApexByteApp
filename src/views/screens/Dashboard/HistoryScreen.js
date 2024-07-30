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
import {InnerHeader, Loader, TransactionCard } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HistoryScreen = ({navigation}) => {

  const entry_id = useSelector((state) => state.account.entry_id);
  const [loading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);

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

  useFocusEffect(
    React.useCallback(() => {
      loadFetchTransactions();
    }, [])
  );

     //truncate strings 
     function TruncateString (message) {
      if (message.length > 28) {
          return ' ' + message.substring(0, 28) + "...";
      }else{
          return ' ' + message;
      }
  }
  //end of truncate string

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <Loader loading={loading} />
    <InnerHeader onPress={() => navigation.goBack()} title="My Transactions" />

    <Text style={styles.titleHdr}>View all transactions till date</Text>

    {(transaction.length > 0) && 

        <View style={styles.transwind}>

        {
          transaction.map((item) => {
            return (
              <TransactionCard 
                onPress={() => navigation.navigate("ViewTransaction")}
                key={item.TRANSACTION_ID}
                narration={TruncateString(item.NARRATION)}
                date={moment(item.DATE_CREATED).format("DD-MMM-YYYY")}
                amount={`$${item.AMOUNT}`}
                status={item.PAYMENT_STATUS}
              />
            )
          })
        }
            
        </View>
    }
      
   {(transaction.length == 0) &&

    <View style={styles.tabBody}>
    <Text style={styles.txtLine1}>Your transactions will show here</Text>
    <Text style={styles.txtLine2}>No available transactions found!</Text>
</View>

   } 

    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  transwind: {
    marginHorizontal: wp(4),
    marginTop: wp(2)
  },
  txtLine1: {
    color: COLORS.textGray,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5)
  },
  txtLine2: {
    marginTop: wp(2),
    color: COLORS.textBoxStrokeColor,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  txtLine1: {
    color: COLORS.textGray,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  titleHdr: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5),
    marginTop: wp(8),
    marginHorizontal: wp(4),
    color: COLORS.textGray,
    marginBottom: wp(3),
    marginLeft: wp(5)
},
  tabBody: {
    backgroundColor: COLORS.tabBGColor,
    borderRadius: wp(7),
    minHeight: wp(120),
    marginHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center'
  }
})