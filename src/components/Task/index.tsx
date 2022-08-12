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
    borderWidth: 1,
    borderColor: '#000',
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
