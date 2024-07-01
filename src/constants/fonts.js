import { Platform } from "react-native";

const FONTS = {
  ...Platform.select({
    ios: {
        POPPINS_BOLD: 'Poppins-Bold',
        POPPINS_LIGHT: 'Poppins-Light',
        POPPINS_REGULAR: 'Poppins-Regular',
        POPPINS_MEDIUM: 'Poppins-Medium',
        POPPINS_SEMIBOLD: 'Poppins-SemiBold'
    },
    android: {
        POPPINS_BOLD: 'PoppinsBold',
        POPPINS_LIGHT: 'PoppinsLight',
        POPPINS_REGULAR: 'PoppinsRegular',
        POPPINS_MEDIUM: 'PoppinsMedium',
        POPPINS_SEMIBOLD: 'PoppinsSemiBold'
    }
  })
}

export default FONTS;