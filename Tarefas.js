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

export default class Tarefas extends Component{

    constructor(props){
        super(props)
        this.state ={
            textoBotaoConcluir: "Concluir"
        }
    }

    Concluir(){
        if(this.state.status == "Em andamento"){
            this.setState({
                
                textoBotaoConcluir:"Liberar"
            })
            this.props.Atualizar(this.props.id, "Concluido")
        }else{
            this.setState({
                
                textoBotaoConcluir:"Concluir"
            })
            this.props.Atualizar(this.props.id, "Em andamento")
        }
        this.props.Atualizar(this.props.id, "Concluido")

        // this.setState({
        //     status: "Concluido"
        // })
        // this.props.Atualizar(this.props.id, "Concluido")
    }

    // Manutencao(){
    //     this.setState({
    //         status:"Em andamneto",
    //         textoBotaoConcluir:"Liberar"
    //     })
    //     this.props.Atualizar(this.props.id, "Em manutenção")
    // }


    render(){
        return(
            <View style={estilo.menu}>
                <View style={estilo.menu}>
                    <Text style={estilo.textoLista}>Id: {this.props.id}</Text>
                    <Text style={estilo.textoLista}>Descrição: {this.props.descricao}</Text>
                    <Text style={estilo.textoLista}>Data de Término: {this.props.data}</Text>
                    <Text style={estilo.textoLista}>Prioridades: {this.props.prioridades}</Text>
                    <Text style={estilo.textoLista}>Situação: {this.props.status}</Text>
                </View>

                <View style={estilo.areaBotoes}>
                    <TouchableOpacity onPress={()=> this.Concluir()} style={estilo.botao}>
                        <Text style={estilo.textoBotao}>{this.state.textoBotaoConcluir}</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity onPress={()=> this.props.Excluir(this.props.id)} style={estilo.botao}>
                        <Text style={estilo.textoBotao}>Excluír</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={()=> this.Manutencao()} style={estilo.botao}>
                        <Text style={estilo.textoBotao}>Manutencao</Text>
                    </TouchableOpacity> */}
                   
                </View>
            </View>
        )
    }
}

const estilo = StyleSheet.create({
    areaBotoes:{
        flexDirection:"row",
    },
    menu:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"orange",
        margin:10
    },
    textoLista:{
        color: "black",
        fontSize:20,
        margin:10,
    },
    imageLista:{
        width:330,
        height:180,
        margin:20
    },
    textoBotao:{
        color:"orange",
        fontSize:13,
        margin:20
      },
      botao:{
        backgroundColor:"black",
        width:120,
        height:57,
        borderRadius:10,
        margin:12,
        alignItems:"center",
        justifyContent:"center",
      },
})
