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
        alignSelf:"flex-start",
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
        alignSelf:"flex-end",
        justifyContent:"center",
        borderRadius:10,

    },
    welcome:{
      alignItems:"center",
      backgroundColor:"#32a88d",
      fontWeight:"600",
      justifyContent:"center",
      height:40,
      fontSize:200,
    
    },
    left:{
      alignItems:"center",
      backgroundColor:"#cf3450",
      fontWeight:"600",
      justifyContent:"center",
      height:40,
      fontSize:200,
    
    }
  });

  export default styles