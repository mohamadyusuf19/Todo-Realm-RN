import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

import { insertNewTodoList, updateTodoList } from '../databases/AllSchemas';

class PopupDialogComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            name: '',
            isAddNew: true
        }
    }

    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show()
        this.setState({
            dialogTitle: 'Add new todo list',
            name: '',
            isAddNew: true
        })
    }
    render(){
        return(
            <PopupDialog
                dialogTitle={<DialogTitle title={this.state.dialogTitle}/>}
                width={0.7} 
                height={170}
                ref={'popupDialog'}
            >
                <View style={styles.container}>
                    <TextInput style={styles.textInput} 
                        placeholder={'Enter todo list'}
                        autoCorrect={false}
                        onChangeText={text => this.setState({ name: text })}
                        value={this.state.name}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => {
                            if(this.state.name.trim() === '') {
                                alert("Please insert todo list name")
                                return
                            }
                            this.refs.popupDialog.dismiss(() => {
                                if(this.state.isAddNew == true) {
                                    const newTodoList = {
                                        id: Math.floor(Date.now()/1000),
                                        name: this.state.name,
                                        creationDate: new Date()
                                    }
                                    insertNewTodoList(newTodoList).then().catch((error) => {
                                        alert(`insert new todo list error ${error}`)
                                    })
                                }
                            })
                        }}>
                        <Text style={styles.textLabel}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.refs.popupDialog.dismiss(() => {
                            console.log(" Called canceled, popup dismiss");
                        })
                    }}>
                        <Text style={styles.textLabel}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
            </PopupDialog>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textInput: {
        width: 200, 
        height: 40,
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1

    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10
    },
    textLabel: {
        color: 'white',
        fontSize: 18
    }
})

export default PopupDialogComponent