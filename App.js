import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from './component/ListItem';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function App() {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')
  const [isActiveCounter, setIsActiveCounter] = useState(0)

  const handleSave = () => {
    if (input.trim()) {
      setTodoList([...todoList, input.trim()])
      setInput('')
    }
  }

  const removeItem = (title) => {
    setTodoList(prevList => prevList.filter(item => item !== title));
  }

  const setCounter = (isActive) => {
    if (isActive)
      setIsActiveCounter(isActiveCounter + 1)
    else
      setIsActiveCounter(isActiveCounter - 1)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Yapılacaklar</Text>
          <Text style={styles.number}>{isActiveCounter}</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={todoList}
            renderItem={({ item }) => {
              return (
                <ListItem title={item} setCounter={setCounter} onRemove={removeItem} />
              )
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            placeholder='Yapılacak...'
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'orange',
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'orange',
  },
  listContainer: {
    flex: 6,

  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#5f9ea0',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center'
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    padding: 5,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});
