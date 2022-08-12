import { StyleSheet, Text, View } from 'react-native';

export default function Task(props: any) {
  const { text } = props;

  return (
    <View style={styles.task}>
      <Text style={styles.taskText}>{text}</Text>
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
  },
});
