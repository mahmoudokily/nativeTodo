import { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";

type Todo = {
  id: number;
  isComplete: boolean;
  text: string;
};
type NewTodoModelProps = {
  visible: boolean;
  onAdd: (newTodo: Todo) => void;
  onCancel: () => void;
};

const NewTodoModel: React.FC<NewTodoModelProps> = ({
  visible,
  onAdd,
  onCancel,
}) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (text: string) => {
    setNewTodo(text);
  };
  const submitNewTodo = () => {
    if (newTodo) {
      const todo = {
        text: newTodo,
        isComplete: false,
        id: Math.floor(Math.random() * 1000000000),
      };
      onAdd(todo);
      setNewTodo("");
    }
  };

  return (
    <Modal style={styles.model} visible={visible} animationType="fade">
      <View style={styles.formContainer}>
        <Image source={require("../assets/iconTodo.png")} style={styles.img} />
        <TextInput
          autoFocus
          style={styles.input}
          placeholder="enter todo"
          onChangeText={handleChange}
          value={newTodo}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              color="white"
              title="Add"
              onPress={submitNewTodo}
              disabled={!newTodo}
            />
          </View>
          <View style={styles.button}>
            <Button color="white" title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewTodoModel;
const styles = StyleSheet.create({
  model: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: "#002275",
    display: "flex",
    alignItems: "center",
    flex: 1,
    height: 100,
    padding: 10,
    justifyContent: "center",
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    padding: 10,
    flex: 1,
    margin: 10,
    alignItems: "stretch",
    backgroundColor: "#0a84ff",
    opacity: 1,
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    fontSize: 20,
  },
});
