import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Complexity = 'Simple' | 'Moderate' | 'Complex';

type Task = {
  title: string;
  date: string;
  estimatedMinutes?: number;
  urgent: boolean;
  complexity: Complexity;
};

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [complexity, setComplexity] = useState<Complexity | null>(null);

  const [errors, setErrors] = useState<{
    title?: string;
    date?: string;
    complexity?: string;
  }>({});

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a task title.';
    }

    if (!date.trim()) {
      newErrors.date = 'Please enter a date.';
    }

    if (!complexity) {
      newErrors.complexity = 'Please select a complexity.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const task: Task = {
      title: title.trim(),
      date: date.trim(),
      estimatedMinutes: estimatedMinutes
        ? Number(estimatedMinutes)
        : undefined,
      urgent,
      complexity: complexity as Complexity,
    };

    console.log('New Task:', task);

    // TODO:
    // Add your task creation / navigation logic here.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Add Task</Text>
            <Text style={styles.subtitle}>
                Create a new task and set its priority.
            </Text>

            {/* Title */}
            <View style={styles.field}>
                <Text style={styles.label}>
                Title <Text style={styles.required}>*</Text>
                </Text>

                <TextInput
                style={[
                    styles.input,
                    errors.title && styles.inputError,
                ]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
                placeholderTextColor="#999"
                />

                {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
                )}
            </View>

            {/* Date */}
            <View style={styles.field}>
                <Text style={styles.label}>
                Date <Text style={styles.required}>*</Text>
                </Text>

                <TextInput
                style={[
                    styles.input,
                    errors.date && styles.inputError,
                ]}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                keyboardType="numbers-and-punctuation"
                />

                {errors.date && (
                <Text style={styles.errorText}>{errors.date}</Text>
                )}
            </View>

            {/* Estimated Minutes */}
            <View style={styles.field}>
                <Text style={styles.label}>Estimated Minutes</Text>

                <TextInput
                style={styles.input}
                value={estimatedMinutes}
                onChangeText={setEstimatedMinutes}
                placeholder="e.g. 30"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                />
            </View>

            {/* Urgent */}
            <View style={styles.field}>
                <View style={styles.switchRow}>
                <View style={styles.switchTextContainer}>
                    <Text style={styles.label}>
                    Urgent <Text style={styles.required}>*</Text>
                    </Text>

                    <Text style={styles.helperText}>
                    Mark this task as a priority.
                    </Text>
                </View>

                <Switch
                    value={urgent}
                    onValueChange={setUrgent}
                />
                </View>
            </View>

            {/* Complexity */}
            <View style={styles.field}>
                <Text style={styles.label}>
                Complexity <Text style={styles.required}>*</Text>
                </Text>

                <View style={styles.complexityContainer}>
                {(['Simple', 'Moderate', 'Complex'] as Complexity[]).map(
                    (option) => {
                    const selected = complexity === option;

                    return (
                        <Pressable
                        key={option}
                        onPress={() => setComplexity(option)}
                        style={[
                            styles.complexityOption,
                            selected && styles.complexityOptionSelected,
                        ]}
                        >
                        <Text
                            style={[
                            styles.complexityText,
                            selected && styles.complexityTextSelected,
                            ]}
                        >
                            {option}
                        </Text>
                        </Pressable>
                    );
                    }
                )}
                </View>

                {errors.complexity && (
                <Text style={styles.errorText}>
                    {errors.complexity}
                </Text>
                )}
            </View>

            {/* Submit */}
            <Pressable
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>
                Add Task
                </Text>
            </Pressable>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },

  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  safeArea: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: '#6E6E73',
    marginBottom: 32,
  },

  field: {
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },

  required: {
    color: '#E53935',
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
  },

  inputError: {
    borderColor: '#E53935',
  },

  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: '#E53935',
  },

  helperText: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: -2,
  },

  switchRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  switchTextContainer: {
    flex: 1,
    marginRight: 16,
  },

  complexityContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  complexityOption: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  complexityOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },

  complexityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },

  complexityTextSelected: {
    color: '#FFFFFF',
  },

  submitButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  submitButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});