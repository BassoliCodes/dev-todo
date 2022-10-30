import { useRef, useState } from 'react';
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
  Keyboard,
} from 'react-native';
import Task from '../components/Task';
import { useTask } from '../context/TaskContext';

import { AntDesign } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';
import { ITask } from '../interfaces/ITask';

export default function Home() {
  const { addTask, taskItems, deleteTask, taskDone } = useTask();
  const [text, setText] = useState<string>(null);

  const animation = useRef(null);
  const animationFile = require('../../assets/animations/not-found.json');

  const handleAddTask = async () => {
    if (!text) {
      return Alert.alert('Ops!', 'Para adicionar uma tarefa, digite algo na caixa de texto.');
    }

    addTask(text);
    setText(null);
    Keyboard.dismiss();

    return Alert.alert('DEV TODO', 'Tarefa adicionada com sucesso!', [{ text: 'OK' }]);
  };

  const handleTask = async (id: string) => {
    if (!id) {
      return Alert.alert('Ops!', 'Não foi possível encontrar a tarefa.');
    }

    const task = taskItems.find((task: ITask) => task.id === id);

    Alert.alert('DEV TODO', 'O que deseja fazer com essa tarefa?', [
      {
        text: 'Excluir',
        onPress: () => deleteTask(id),
      },
      {
        text: !task.done ? 'Marcar como concluída' : 'Remover de concluída',
        onPress: () => taskDone(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas de hoje</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.items}>
            {taskItems.length > 0 ? (
              <>
                {taskItems.map((task, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => handleTask(task.id)}>
                      <Task
                        id={task.id}
                        text={task.text}
                        created_at={task.created_at}
                        done={task.done}
                      />
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <Text style={styles.noTasks}>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 400,
                    backgroundColor: 'transparent',
                  }}
                  source={animationFile}
                />
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView style={styles.writeTaskWrapper} behavior="height">
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
    fontFamily: 'Poppins_700Bold',
  },
  items: {
    marginTop: 30,
  },
  noTasks: {
    fontSize: 18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 100,
    flexDirection: 'column',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 30 : 15,
    backgroundColor: 'white',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins_400Regular',
    borderWidth: 1,
    width: '80%',
    height: 60,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 10,
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
