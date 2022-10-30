import { StyleSheet, Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';

import { ITask } from '../../interfaces/ITask';

export default function Task(props: ITask) {
  const { text, created_at, done } = props;

  return (
    <View style={styles.task}>
      <Text style={styles.taskText}>{text}</Text>
      <Text style={styles.taskCreatedAt}>
        {format(new Date(created_at), "dd/MM/yyyy 'às' HH:mm")}
      </Text>
      <View style={styles.taskStatus}>
        {done ? <AntDesign name="checkcircle" size={24} color="#00FF00" /> : null}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  task: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 1,
  },
  taskText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d1d1d',
    fontFamily: 'Poppins_600SemiBold',
  },
  taskCreatedAt: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
  taskStatus: {
    position: 'absolute',
    right: -5,
    top: -15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
