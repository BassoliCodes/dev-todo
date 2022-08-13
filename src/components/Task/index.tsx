import { StyleSheet, Text, View } from 'react-native';

import { format } from 'date-fns';

export default function Task(props: any) {
  const { text, created_at } = props;

  return (
    <View style={styles.task}>
      <Text style={styles.taskText}>{text}</Text>
      <Text style={styles.taskCreatedAt}>
        {format(new Date(created_at), "dd/MM/yyyy 'às' HH:mm")}
      </Text>
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
  },
  taskCreatedAt: {
    fontSize: 14,
    color: '#999',
  },
});
