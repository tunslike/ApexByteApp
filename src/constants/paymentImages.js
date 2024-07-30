const PaymentImageMatchAlgorithm = (network) => {

    if(network == '') 
        return;

    //match rice picture
    if(network.toLowerCase().indexOf("eth") > -1) {

        return require("../assets/icons/eth_icon.png")

    }else if(network.toLowerCase().indexOf("btc") > -1) {

        return require("../assets/icons/btc_icon.png")
    }
    else{

        return;
    }
}

export default {
    PaymentImageMatchAlgorithm,
}