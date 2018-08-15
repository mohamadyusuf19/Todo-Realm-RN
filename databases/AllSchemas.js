import Realm, { List } from 'realm';

export const TODOLIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';

//Model untuk TodoSchema
export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true},
        done: { type: 'bool', default: false}
    }
}
//Model utuk todolist schema, jadi di dalam todolist schema akan ada banyak todo
export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectType: TODO_SCHEMA}
    }
}

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoSchema, TodoListSchema],
    schemaVersion: 1
}

export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            
            realm.create(TODOLIST_SCHEMA, newTodoList)
            resolve(newTodoList)
            console.log(newTodoList);
        })
    }).catch(error => reject(error));
})

export const updateTodoList = todoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id);
            updatingTodoList.name = todoList.name;
            resolve();
        });
    }).catch(error => reject(error))
})

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId)
            realm.delete(deletingTodoList);
            resolve();
        })
    }).catch(error => reject(error))
}) 

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoList = realm.objects(TODOLIST_SCHEMA);
            realm.delete(allTodoList)
            resolve(allTodoList)
        })
    }).catch(error => reject(error))
})

export const queryAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodoList = realm.objects(TODOLIST_SCHEMA);
        resolve(allTodoList)
    }).catch(error => reject(error))
})

export default new Realm(databaseOptions)
