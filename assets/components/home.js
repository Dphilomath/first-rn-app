import React, { useState } from "react";
import { StyleSheet, Button, TextInput, Text, View } from "react-native";
import styles from "../styles/styles"

export default function Home({navigation}){
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");   
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false)


  const loadStatus = ()=>{
    if(loading===true){
      return(
        <View style={styles.notify}>
          <Text>Please wait...</Text>
        </View>
      )
    }
  }

  const handleSubmit = (e) => {
    var body = {
        user: user,
        room: room,
        key: key,
    }

    if(user==="" || room===""|| key==="") {
      alert("please fill all the fields")
      return;
    }
    setLoading(true)

    fetch('https://chatapp-rn-backend.herokuapp.com/chat', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.valid===true){
            navigation.navigate('Chatpage', data)
          }
          else{
            alert("Invalid credentials")
            setLoading(false)
            navigation.navigate('Home')
          }
          // console.log(data)
        })
        .catch((err) => {
          setLoading(false)
          alert("Error: " + err)
          // console.log('Error: ' + err)
        })
    }

  return (
    <>
      <View style={styles.container}> 
        <Text style={{ fontSize: 30 }}>Join Chatroom</Text>
        <View
          style={{ flexDirection: "column", width: "60%", paddingBottom: 10 }}
        >
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setRoom(text);
            }}
            placeholder="room name"
            value={room}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setKey(text);
            }}
            placeholder="key"
            value={key}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setUser(text);
            }}
            placeholder="username"
            value={user}
          />
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-around", width: "70%"}} >
          <Button disabled={loading} color="#847db0" style={styles.button} title="Join" onPress={handleSubmit} />
          <Button disabled={loading} color="#847db0" style={styles.button} title="new chatroom"  onPress={() => navigation.navigate('Newroom')}/>
        </View>
        {loadStatus()}
      </View>
    </>
  );
}
