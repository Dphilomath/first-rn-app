import React, { useState, useEffect } from "react";
import { StyleSheet, Button, TextInput, Text, View, ScrollView, FlatList } from "react-native";
import './UserAgent'
import io from 'socket.io-client';


function Chatpage({route, navigation}){
    const {chatRoom, key, user} = route.params
    const [messages, setMessages] = useState([""]);
    const [input, setInput] = useState("")
    const [socket, setSocket] = useState(()=>io("ws://chatapp-rn-backend.herokuapp.com/"))

    useEffect(()=>{
        socket.on("connect", ()=>{
            socket.emit("welcome", {user, chatRoom})
        })
        socket.on("welcome", msg=>{ 
            alert(msg)
        })
        //why do we put it here and not outside??
        socket.on("chat message", data=>{
            // setMessages(messages => [...messages, data.msg])
            setMessages(messages => [...messages, data])
        })
        return () => socket.disconnect();
    }, [])

    // useEffect(() => {return () => socket.disconnect()})


    const handleSubmit = () =>{
        // setMessages(messages => [...messages, input])
        socket.emit("chat message", {msg:input, user:user, room:chatRoom})
        setInput("")
    }
    return(
        <View style={{flex:1}}>
            <Text style={{fontSize:30}}>Welcome to {chatRoom}, {user}</Text>
            <Text style={{fontWeight:"bold"}}>key:{key}</Text>
            <View style={{flex:0.9}}>
            <ScrollView>
            <View>
                {/* { messages.map(message => <Text style={styles.message} key={100*Math.random().toString(10)}>{message}</Text> ) } */}
                { messages.map(message =>
                    <View style={message.user===user?styles.self:styles.other} key={100*Math.random().toString(10) }>
                        <Text>{message.user}</Text>  
                        <Text>{message.msg}</Text>
                    </View> 
                )}
            </View>  
            </ScrollView>
            </View>
            <View style={{flexDirection:"row", flex:1, paddingBottom:10, justifyContent:"space-around", bottom:0, position:"absolute"}}>
                <TextInput style={{flex:1, borderWidth:1, borderRadius:5}} onChangeText={text=>setInput(text)} value = {input} />
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
    },
    self:{
        alignContent:"center",
        justifyContent:"center",
        alignSelf:"flex-start"
    },
    other:{
        alignContent:"flex-end",
    }
  });

  export default Chatpage
