import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Menu extends Component{
    render(){
        return(
            <View style={estilo.menu}>
                <Text style={estilo.texto}>Agenda Pessoal</Text>
            </View>
        )
    }
}

const estilo = StyleSheet.create({
    menu:{
      alignItems:"center",
      justifyContent:"center",
    },
    texto:{
      color: "White",
      fontSize:40,
      margin:4
    },
    image:{
      width:370,
      height:180,
      margin:20
    },
})
