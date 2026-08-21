import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

const complexityText = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard'
}

export default function TodoItem({ item, onDelete }: { item: TodoItem; onDelete: (id: string) => void }) {
    const [completed, setCompleted] = useState(false)
    
    return (
        <View style={styles.todoItem}>
            <Checkbox value={completed} onValueChange={() => setCompleted(!completed)} />
            <Text style={styles.todoText}>{item.text}</Text>
            <Text>{complexityText[item.complexity]}</Text>
        </View>
    )
}

//Add swap interaction for todo deletion