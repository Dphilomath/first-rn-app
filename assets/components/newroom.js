import React, {useState} from "react"
import { Button, TextInput, Text, View } from "react-native";
import styles from "../styles/styles"

export default function Newroom({navigation}) {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = (e)=>{
      var body = {
          user: user,
          room: room,
      }
      if(user==="" || room==="") {
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
              setLoading(false)
              if(data.valid===true){
                navigation.navigate('Chatpage', data)
              }
              else{
                alert(data.reason)
                navigation.navigate('Newroom')
              }
              // console.log(data)
          })
          .catch((err) => {
            alert("Error: "+err)
            // console.log('Error: ' + err)
          })
  }

  const loadStatus = ()=>{
    if(loading===true){
      return(
        <View style={styles.notify}>
          <Text>Please wait...</Text>
        </View>
      )
    }
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
            <Button disabled={loading} color="#847db0" style={styles.button} title="create" onPress={handleSubmit} />
          </View>
          {loadStatus()}
        </View>
      </>
    );
  }
