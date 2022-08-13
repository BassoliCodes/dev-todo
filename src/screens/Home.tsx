import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Task from '../components/Task';
import { useTask } from '../context/TaskContext';

import { AntDesign } from '@expo/vector-icons';

import { Keyboard } from 'react-native';

export default function Home() {
  const { addTask, taskItems, deleteTask } = useTask();
  const [text, setText] = useState<string>(null);

  const handleAddTask = async () => {
    if (!text) {
      return Alert.alert('Ops!', 'Para adicionar uma tarefa, digite algo na caixa de texto.');
    }

    addTask(text);
    setText(null);
    Keyboard.dismiss();
    return Alert.alert('DEV TODO', 'Tarefa adicionada com sucesso!', [{ text: 'OK' }]);
  };

  const handleDeleteTask = async (id: string) => {
    deleteTask(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Tarefas de hoje</Text>
          <View style={styles.items}>
            {taskItems.map((task, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => handleDeleteTask(task.id)}>
                  <Task text={task.text} created_at={task.created_at} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Escreva a sua tarefa'}
          defaultValue={text}
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              <AntDesign name="plus" size={34} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    marginBottom: 20,
    borderWidth: 1,
    width: '80%',
    height: 60,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    backgroundColor: '#444B6F',
  },
  addText: {
    color: 'white',
  },
});
