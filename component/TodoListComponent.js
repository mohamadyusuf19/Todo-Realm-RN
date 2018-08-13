import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { updateTodoList, deleteTodoList, queryAllTodoList } from '../databases/AllSchemas';
import Swipeout from 'react-native-swipeout';

import HeaderComponent from '../component/HeaderComponent'
import PopupDialogComponent from '../component/PopupDialogComponent'
let FlatListItem = props => {
    const { itemIndex, id, name, creationDate, popupDialogComponent, onPressItem } = props
    showEditModal = () => {

    }
    showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete a todo list',
            [
                {
                    text: 'No', 
                    onPress: () => {

                    },
                    style: 'cancel'
                },
                {
                    text: 'Yes', 
                    onPress: () => {

                    }
                }
            ]
        )
    }
    return (
        <Swipeout right={[
            {
                text: 'edit',
                backgroundColor: 'rgb(81, 134, 237)',
                onPress: showEditModal
            },
            {
                text: 'delete',
                backgroundColor: 'rgb(217, 80, 64)',
                onPress: showDeleteConfirmation
            }
        ]} autoClose={true}>
            <TouchableOpacity onPress={onPressItem}>
                <View style={{ backgroundColor: itemIndex % 2 == 0 ? 'powerblue' : 'skyblue'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>{name}</Text>
                    <Text style={{ fontSize: 18, margin: 10}} numberOfLines={2}>{creationDate.toLocaleString()}</Text>
                </View>
            </TouchableOpacity>

        </Swipeout>
    )
}
class TodoListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todoLists: []
        }
        this.reloadData();
    }

    reloadData() {
        queryAllTodoList().then((todoLists) => {
            this.setState({ todoLists })
        }).catch((error) => {
            this.setState({ todoLists: [] })
        })
        console.log('reload data');
    }

    render(){
        console.log(this.state.todoLists);
        return (
            <View style={styles.container}>
            <HeaderComponent 
                title={"Todo List"}
                hasAddButton={true}
                showAddTodoList={() => {this.refs.popupDialogComponent.showDialogComponentForAdd()}}
            />
            <FlatList 
                style={styles.flatList}
                data={this.state.todoLists}
                keyExtractor={i => i.toString()}
                renderItem={({item, index}) => 
                    <FlatListItem 
                        popupDialogComponent={this.refs.popupDialogComponent}
                        {...item} 
                        itemIndex={index}
                        onPressItem={() => {
                            Alert.alert('You pressed')
                        }}
                    />}
            />
            <PopupDialogComponent ref={'popupDialogComponent'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    flatList: {
        flex: 1, 
        flexDirection: 'column'
    }
})

export default TodoListComponent;