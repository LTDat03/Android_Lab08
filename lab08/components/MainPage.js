import React,{useState}from 'react';
import { Image,Text, SafeAreaView, StyleSheet, View, FlatList,TouchableOpacity, TextInput, Modal, Button} from 'react-native';
import {AntDesign, Fontisto} from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, editTask } from '../redux/reducers/taskReducer';

export default function App() {
  const [task, setTask] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTaskId,setEditingTaskId] = useState(null);

  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if(task.trim()){
      const newTask = {
        id: (tasks.length + 1).toString(),
        title: task,
      };
      dispatch(addTask(newTask));
      setTask('');
      setIsModalVisible(false)
    }
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id)); 
  };

  const handleEditTask = () =>{
    if(task.trim() && editingTaskId){
      dispatch(editTask({id: editingTaskId, title:task}));
      setTask('');
      setIsModalVisible(false);
      setEditingTaskId(null);
    }
  }

  const openModalToAdd = () => {
    setIsModalVisible(true);
    setEditingTaskId(null); 
    setTask('');
  };

  const openModalToEdit = (task) => {
    setIsModalVisible(true);
    setEditingTaskId(task.id);
    setTask(task.title);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.task}>
        <View style={styles.checkbox}>
          <Text style = {styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.taskText}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity style={styles.editClick} onPress={() => openModalToEdit(item)}>
        <AntDesign name="edit" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editClick} onPress={() => handleRemoveTask(item.id)}>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <View style={styles.info}> 
            <Image source={require("../assets/Rectangle.png")} style={{height:50,width:50,borderRadius:50,backgroundColor:"#D9CBF6"}}/>
            <View style={styles.textHeader}>
              <Text style={styles.username}> 
                Hi Twinkle
              </Text>
              <Text style={styles.greeting}>
                Have agrate day a head  
              </Text>
            </View>
        </View>
      </View>
      <View style={styles.boxSearch}>
        <Fontisto name="search" size={24} color="black" />
        <TextInput style={styles.textInput} placeholder="Search" />
      </View>
      <View>
        <FlatList 
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={openModalToAdd}>
        <AntDesign name="plus" size={24} color="white" /> 
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingTaskId ? 'Edit Task' : 'Add New Task'}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter task title"
              value={task}
              onChangeText={setTask}
            />
            <Button title={editingTaskId ? 'Save Changes' : 'Add Task'} onPress={editingTaskId ? handleEditTask : handleAddTask} />
            <Button title="Cancel" color="red" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20,
    marginHorizontal:10,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  info:{
    flexDirection:'row',
    alignItems:'center'
  },  
  textHeader:{
    justifyContent: 'center',
  },  
  username:{
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:5,
  },
  greeting:{
    fontSize:14,
    fontWeight:'bold',
    color:"#9095A0",
  },  
  boxSearch:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginTop:20,
    marginBottom:30,
    flexDirection:'row',
    marginHorizontal:10,
  },  
  textInput:{
    flex:1,
    fontSize:16,
    paddingLeft:5,
  },
  taskContainer:{
    borderRadius:20,
    margin:6,
    backgroundColor: '#DEE1E678',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:20,
    padding:5
  },
  task:{  
    flexDirection:'row',
    alignItems:'center',
  },
  checkmark:{
    color:"#14923E",
    fontWeight:'700',
  },
  checkbox:{
    borderWidth:2,
    borderColor:"#14923E", 
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    padding:3,
  },
  taskText:{
    fontSize:16,
    fontWeight: 'bold',
    paddingLeft:10
  },
  editClick:{
    padding:5,
  },
  list: {
    paddingBottom: 20,
  },
  addButton:{
    backgroundColor:'#00BDD6',
    width:69,
    height:69,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:40,
    alignSelf:'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
   modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    padding: 5,
  },
});
