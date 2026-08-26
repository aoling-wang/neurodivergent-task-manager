import { StyleSheet, Text, View, ScrollView } from 'react-native';
import createMMKV from 'react-native-mmkv-storage';
import { useState } from 'react';
import TodoItem from './TodoItem';

const storage = createMMKV({
    id: 'todoStorage'
});



export type TodoItem = {
    id: string;
    text: string;
    complexity: number;
    priority: number;
};

export default function HomeScreen() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    setTodos(JSON.parse(storage.getString('todos')) || []);

    function deleteTodo(id: string) {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        storage.set('todos', JSON.stringify(newTodos));
    }

    const orderedToDos = todos.sort((a, b) => a.complexity - b.complexity);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
            <View style={styles.todoContainer}>
                {orderedToDos.map((item) => (
                    <TodoItem key={item.id} item={item} onDelete={deleteTodo} />
                ))}
            </View>