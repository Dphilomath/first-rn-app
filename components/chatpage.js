import React, { useState, useEffect } from "react";
import { Button, TextInput, Text, View, FlatList, SafeAreaView } from "react-native";
import './UserAgent'
import io from 'socket.io-client';
import styles from "../styles/styles"


function Chatpage({route, navigation}){
    const {chatRoom, key, user} = route.params
    const [messages, setMessages] = useState([{msg:"entry"}]);
    const [input, setInput] = useState("")
    const [socket, setSocket] = useState(()=>io("ws://chatapp-rn-backend.herokuapp.com/"))
    const [gref, setGref] = useState("")

    useEffect(()=>{
        socket.on("connect", ()=>{
            socket.emit("welcome", {user, chatRoom})
        })
        socket.on("welcome", data=>{ 
            setMessages(messages => [...messages, data])
        })
        //why do we put it here and not outside??
        socket.on("chat message", data=>{
            setMessages(messages => [...messages, data])
        })
        socket.on("disconnected", data=>{
            setMessages(messages => [...messages, data])
        })
        
        return () => socket.disconnect();
    }, [])



    const handleSubmit = () =>{
        // setMessages(messages => [...messages, input])
        if(input==="") return;
        setInput("")
        socket.emit("chat message", {msg:input, user:user, room:chatRoom})
    }
    const renderItem = ( ({item})=>{
        
        if(item.msg==="entry") return;
        if(item.msg === "welcome"){
         return(
            <View style={styles.welcome} >
                <Text>glad to see you here, {item.user}!!</Text>  
            </View>
        )}
        else if(item.msg==="left"){
          return(
            <View style={styles.left} >
                <Text>{item.user} just left..</Text>  
            </View>
        )}
        else return (
            <View style={item.user===user?styles.self:styles.other} >
                <Text style={{fontWeight:"bold", flexWrap:"wrap"}}>{item.user}</Text>  
                <Text>{item.msg}</Text>
            </View>
        )
    })

 

    return(
        <View style={{flex:1, margin:"2%"}}>
            <Text style={{flexDirection:"row", alignSelf:"flex-end", flex:0.04, alignContent:"center", fontSize:17}}>Key: <Text onPress={()=>styles.key={display:"flex"}}>{key}</Text></Text>
            <View style={{flex:0.88}} >
                <SafeAreaView  >
                <FlatList showsVerticalScrollIndicator={false}    
                    ref={(list) => {setGref(list)}}
                    onContentSizeChange={() => gref.scrollToEnd({animated: true})}
                    onLayout={({layout}) => {
                        gref.scrollToEnd({animated: true})}}
                    data={messages}
                    getItemLayout={(data, index) => (
                        {length: 62, offset: 62 * index, index}
                      )}
                    renderItem={renderItem}
                    keyExtractor={({index}) => index||Math.random().toString()}
                />

                {/* <AutoScrollFlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={({index}) => index||Math.random().toString()}
                /> */}
                </SafeAreaView>
            
            </View>
            
            <View style={styles.send}>
                <TextInput style={{flex:1, borderWidth:1, borderRadius:5}} onChangeText={text=>setInput(text)} value = {input} />
                <Button color="#847db0" style={styles.button} title="Send" onPress = {handleSubmit}/>
            </View>
        </View>
    )
}

  export default Chatpage
