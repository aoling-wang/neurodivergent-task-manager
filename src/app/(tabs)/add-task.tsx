import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View
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
        <ThemedText style={styles.title}>Add Task</ThemedText>
        <ThemedText style={styles.subtitle}>
          Create a new task and set its priority.
        </ThemedText>

        {/* Title */}
        <ThemedView style={styles.field}>
          <ThemedText style={styles.label}>
            Title <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>

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
            <ThemedText style={styles.errorText}>{errors.title}</ThemedText>
          )}
        </ThemedView>

        {/* Date */}
        <ThemedView style={styles.field}>
          <ThemedText style={styles.label}>
            Date <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>

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
            <ThemedText style={styles.errorText}>{errors.date}</ThemedText>
          )}
        </ThemedView>

        {/* Estimated Minutes */}
        <ThemedView style={styles.field}>
          <ThemedText style={styles.label}>Estimated Minutes</ThemedText>

          <TextInput
            style={styles.input}
            value={estimatedMinutes}
            onChangeText={setEstimatedMinutes}
            placeholder="e.g. 30"
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />
        </ThemedView>

        {/* Urgent */}
        <ThemedView style={styles.field}>
          <View style={styles.switchRow}>
            <View style={styles.switchTextContainer}>
              <ThemedText style={styles.label}>
                Urgent
              </ThemedText>

              <ThemedText style={styles.helperText}>
                Mark this task as a priority.
              </ThemedText>
            </View>

            <Switch
              value={urgent}
              onValueChange={setUrgent}
            />
          </View>
        </ThemedView>

        {/* Complexity */}
        <ThemedView style={styles.field}>
          <ThemedText style={styles.label}>
            Complexity <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>

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
                    <ThemedText
                      style={[
                        styles.complexityText,
                        selected && styles.complexityTextSelected,
                      ]}
                    >
                      {option}
                    </ThemedText>
                  </Pressable>
                );
              }
            )}
          </View>

          {errors.complexity && (
            <ThemedText style={styles.errorText}>
              {errors.complexity}
            </ThemedText>
          )}
        </ThemedView>

        {/* Submit */}
        <Pressable
            style={styles.submitButton}
            onPress={handleSubmit}
        >
          <ThemedText style={styles.submitButtonText}>
            Add Task
          </ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },

  title: {
    color: '#F1F5F9',
    // fontFamily: 'Outfit',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 33.6, /* 120% */
    letterSpacing: -0.56,
  },

  subtitle: {
    color: '#94A3B8',
    // fontFamily: 'Inter',
    fontSize: 13,   
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 19.5, /* 150% */
    marginBottom: 24,
  },

  field: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F1F5F9',
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