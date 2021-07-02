import React from 'react';
import {Text,TextComponent,View,FlatList, TextInput, StyleSheet,} from 'react-native';
import db from '../config';
import {ScrollView, TouchableOpacity}from 'react-native-gesture-handler';
export default class SearchScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allTransactions: [],
            lastVisibleTransaction: null
        }
    }
    fetchMoreTransactions = async()=> {
        var enteredText = text.split("")
        var text = this.state.search.toUpperCase()

        if(enteredText[0].toUpperCase()==="B"){
            const query = await db.collection("transactions").where("bookId","==",text)
            .startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                lastVisibleTransaction:doc
                })
            })
        }else if(enteredText[0].toUpperCase()==="S"){
            const query = await db.collection("transactions").where("bookId","==",text)
            .startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                lastVisibleTransaction:doc
                })
            })
        }


        const query = await db.collection("transactions").startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions: [...this.state.allTransactions, doc.data()],
                lastVisibleTransaction:doc
            })
        })
    }

    searchTransactions = async(text)=>{
        var enteredText = text.split(" ")
        var text = text.toUpperCase()

        if(enteredText[0].toUpperCase()==="B"){
            const transaction = await db.collection("transactions").where("bookId","==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                lastVisibleTransaction:doc
                })
            })
        }else if(enteredText[0].toUpperCase()==="S"){
            const transaction = await db.collection("transactions").where("studentId","==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                lastVisibleTransaction:doc
                })
            })
        }
    }
    componentDidMount = async () => {
        const query = await db.collection("transactions").limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions: [...this.state.allTransactions,doc.data()]
            })
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.searchBar}>
                    <TextInput style = {styles.bar}
                    placeholder = "Enter Book Id or StudentId"
                    onChangeText = {(text)=>{this.setState({search:text})}}/>
                    <TouchableOpacity style = {styles.searchButton}
                    onPress = {()=>{this.searchTransactions(this.state.search)}}>
                        <Text> Search </Text>
                    </TouchableOpacity>
                    </View> 
                    
            <FlatList data = {this.state.allTransactions}
            renderItem = {({item})=>(
                <View style = {{borderBottomWidth:2}}>
                <Text>{"Book ID: "+ item.bookId}</Text>
                <Text>{"Student ID: "+item.studentId}</Text>
                <Text>{"Transaction Type: "+item.itemType}</Text>
                
            </View>
            )} 
            keyExtractor = {(item,index)=>index.toString()}
            onEndReached = {this.fetchMoreTransactions}
            onEndReachedThreshold = {0.7}
            />
          </View> 
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        width: 'auto',
        borderWidth: 0.5,
        alignItems: "center",
        backgroundColor: 'grey',       
    },
    bar: {
        borderWidth: 2,
        height: 30,
        width: 300,
        paddingLeft: 10,
    },
    searchButton: {
        borderWidth:1,
        height:30,
        width:30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'green',
    },

})