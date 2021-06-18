import React, { useState, useEffect } from "react";
import { StyleSheet, Button, TextInput, Text, View, ScrollView, FlatList } from "react-native";
import './UserAgent'
import io from 'socket.io-client';

function Chatpage({route, navigation}){
    const {chatRoom, key, user} = route.params
    const [messages, setMessages] = useState([""]);
    const [input, setInput] = useState("")

    useEffect(()=>{
        const socket = io("ws://192.168.43.229:8080")
        socket.on("connect", ()=>{
            console.log("sent a request")
            socket.emit("welcome", {user, chatroom})
        })
        return () => socket.disconnect();
    }, ["ws://192.168.43.229:8080"])
    
    handleSubmit = () =>{
        setMessages(messages => [...messages, input])
        setInput("")
    }
    return(
        <View>
            <Text style={{fontSize:30}}>Welcome to {chatRoom}, {user}</Text>
            <Text>key:{key}</Text>
            <ScrollView>
            <View style={{height:"60%"}}>
                { messages.map(message => <Text style={styles.message} key={message}>{message}</Text> ) }
            </View>  
            </ScrollView>
            
            <View style={{flexDirection:"row", width:"100%", paddingBottom:10, justifyContent:"space-around"}}>
                <TextInput style={{width:"80%", borderWidth:1}} onChangeText={text=>setInput(text)} value = {input} />
                <Button title="Send" onPress = {handleSubmit}/>
            </View>
        </View>
    )
}


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
      borderBottomWidth: 0.8,
      height: 35,
      textAlign: "center",
      fontSize: 17,
    },
    message:{
        fontSize:20
    }
  });

  export default Chatpage
