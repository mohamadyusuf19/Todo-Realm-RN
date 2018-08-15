import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, Alert } from "react-native";
import { deleteAllTodoList } from '../databases/AllSchemas'

const HeaderComponent = props => {
    let {showAddTodoList, title, hasAddButton, hasShortButton, short, sortState, hasDeleteAllButton } = props
    return (
        <View style={styles.container}>
            {hasDeleteAllButton && <TouchableOpacity style={styles.deleteButton} onPress={
                () => {
                    Alert.alert(
                        'Delete All',
                        'Are you sure you want to delete all list?',
                        [
                            {
                                text: 'No',
                                style: 'cancel'
                            },
                            {
                                text: 'Yes',
                                onPress: () => {deleteAllTodoList().then().catch(error => {
                                    alert(`error to delete all ${error}`)
                                })}
                            }
                        ]
                    )
                }
            }>
                <Image source={require('../image/delete.png')} style={styles.deleteButtonImage}/>
            </TouchableOpacity>}
            {hasAddButton && <TouchableOpacity style={styles.addButton} onPress={showAddTodoList}> 
                <Image style={styles.addButtonImage} source={require('../image/plus.png')}/>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#031f4c',
        height: Platform.OS === 'ios' ? 100 : 80
    },
    addButton: {
        zIndex: 2,
        marginRight: 10,
        marginTop: 10,
    },
    addButtonImage: {
        width: 42,
        height: 42,
    },
    deleteButton: {
        zIndex: 2,
        marginRight: 10,
        marginTop:10
    },
    deleteButtonImage: {
        width: 42,
        height: 42,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        padding: 50
    }
})

export default HeaderComponent;
