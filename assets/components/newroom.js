import React, {useState} from "react"
import { StyleSheet, Button, TextInput, Text, View } from "react-native";

export default function Newroom({navigation}) {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
  
    const handleSubmit = (e)=>{
      var body = {
          user: user,
          room: room,
      }
  
      fetch('http://c89a1f9adbeb.ngrok.io/chat', {
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
                navigation.push('Newroom')
              }
              console.log(data)
          })
          .catch((err) => console.log('Error: ' + err))
  }
  
    return (
      <>
        <View style={styles.container}> 
          <Text style={{ fontSize: 30 }}>Create a new Chatroom</Text>
          <View style={{ flexDirection: "column", width: "60%", paddingBottom: 10 }} >
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
                setUser(text);
              }}
              placeholder="username"
              value={user}
            />
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-around", width: "70%"}} >
            <Button title="submit" onPress={handleSubmit} />
          </View>
        </View>
      </>
    );
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
  });
  
