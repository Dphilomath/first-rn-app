import {StyleSheet} from "react-native"
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: "space-around",
      alignItems: "stretch",
      backgroundColor: "#ddd",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderBottomColor: "#5b6fe3",
      borderBottomWidth:1,
      height: 35,
      textAlign: "center",
      fontSize: 17,
      margin:10
    },
    message:{
        fontSize:20
    },
    self:{
        alignSelf:"flex-end",
        justifyContent:"center",
        backgroundColor:"#dadee6",
        borderRadius:10,
        margin:5,
        padding:5,
    },
    other:{
        backgroundColor:"#c8abc9",
        margin:5,
        padding:5,
        alignSelf:"flex-start",
        justifyContent:"center",
        borderRadius:10,

    },
    welcome:{
      alignItems:"center",
      backgroundColor:"#32a88d",
      fontWeight:"600",
      justifyContent:"center",
      height:40,
      opacity:0.5,
      borderRadius:10
    },
    left:{
      alignItems:"center",
      backgroundColor:"#c73528",
      fontWeight:"600",
      justifyContent:"center",
      height:40,
      opacity:0.5,
      borderRadius:10
    },
    notify:{
      fontSize:20,
      height:30,
      backgroundColor:"#77c9c4",
      opacity:0.5,
      width:"70%",
      alignItems:"center",
      justifyContent:"center"
    },
    send:{
      flexDirection:"row",
      flex:1,
      paddingBottom:10,
      justifyContent:"space-around",
      bottom:0,
      position:"absolute",
      width:"100%"
    }
  });

  export default styles