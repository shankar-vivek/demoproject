import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    header:{
       width:'100%',
       height:50,
       borderBottomWidth:0.7,
       borderBottomColor:'grey',
       alignItems:'center'
    },
    container:{
        backgroundColor:'white',
        height:'100%'
    },
    body:{
     padding:20
    },
    question:{

    },
    questionText:{
        fontWeight:'400',
        fontSize:14,
        lineHeight:28
        
    },Input:{
       borderColor:'blue'

    },
    bottomContainer:{
      marginTop:'auto',
      bottom:10,
      padding:20
    }
})
export default styles;