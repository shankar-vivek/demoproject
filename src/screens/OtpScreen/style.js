import { Header } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Header:{
        alignSelf:'center',
        width:'100%',
        alignItems:'center'
    },
  container: {
    flex: 1,
   
    padding: 20,
    backgroundColor: '#fff'
  },
  Body:{
    top:'10%'
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600'
  },
  otpContainer: {
    marginBottom: 20
  },
  resendText:{color:'blue',textDecorationLine:'underline'},
  otpBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
    width:60
  },
  otpText: {
    fontSize: 20,
    color: '#000'
  },
  bottom:{
    marginTop:'100%',
    justifyContent:'flex-end'
  }
});
export default styles;