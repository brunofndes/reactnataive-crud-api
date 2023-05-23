import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function App() {

  const [list, setList] = useState([])

  useEffect(() => {
    getListTeacher();
  },[])

  const getListTeacher = ()=>{
    fetch("http://localhost:8080/api/customer/", {
      method: 'GET',
    }).then(res=>{
      return res.json()
    }).then(res=>{
      if(res){
        setList(res.list)
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  const handleRemove = (item) =>{
    fetch("http://localhost:8080/api/customer/", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'       
      },          
      body : JSON.stringify({
        "customer_id" : item.customer_id     
      })     
      
    }).then(res=>{
      return res.json()
    }).then(res=>{
      console.log(res)
      getListTeacher()
    }).catch(err=>{
      console.log(err)
    })
   
  }

  return (
    <SafeAreaView>
      <Text style={styles.txtMain}>Teacher List {list.length}</Text>
      <ScrollView
      contentContainerStyle={{
        paddingHorizontal:10 
      }}
      >

       { list.map((item, index)=>{
          return (
            <View key={index} style={styles.rowBetween}>
            <View  style={styles.item}  >
              <Text style={styles.txtName}>{item.firstname} {item.lastname}</Text>
              <Text style={styles.txtNormal}>{item.gender}</Text>
              <Text style={styles.txtNormal}>{item.tel}</Text>
              <Text style={styles.txtNormal}>{item.email}</Text>              
            </View>
            <View>
              <TouchableOpacity onPress={() => handleRemove(item)}>
                <Text style={styles.txtDelete}>Delete</Text>
              </TouchableOpacity>
            </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:10,
    borderBottomWidth: 1,
    borderBottomColor:"#888"
  },
  txtMain:{
    fontSize:16,
    fontWeight:"bold",
    padding:10,
  },
  item:{
    
  },
  txtName:{
    fontSize:16,
    fontWeight:"bold",
  },
  txtNormal:{
    fontSize:14,
    color:"#444"
  },
  txtDelete:{
    color:"red"
  }
});
