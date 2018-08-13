import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, Alert } from "react-native";

const HeaderComponent = props => {
    let {showAddTodoList, title, hasAddButton, hasShortButton, short, sortState, hasDeleteAllButton } = props
    return (
        <View style={styles.container}>
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
        backgroundColor: 'rgb(224, 93, 144)',
        height: Platform.OS === 'ios' ? 100 : 80
    },
    addButton: {

    },
    addButtonImage: {
        zIndex: 2,
        marginRight: 10,
        marginTop: 30
    },
    addButtonImage: {
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
