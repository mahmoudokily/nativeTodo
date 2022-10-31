import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Image,
  Touchable,
  TouchableHighlightBase,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import NewTodoModel from "./components/NewTodoModel";
import TodoItem from "./components/TodoItem";
import { Todo } from "./types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastPressed, setLastPressed] = useState<number>(0);
  const [isVisibleModel, setIsVisibleModel] = useState<boolean>(false);

  const onToggleHandler = (todo: Todo) => () => {
    var delta = new Date().getTime() - lastPressed;
    if (delta < 200 && todo) {
      let newTodo = todo;
      newTodo["isComplete"] = !todo.isComplete;
      setTodos((todos) => [
        ...todos.filter(({ id }) => id !== todo.id),
        newTodo,
      ]);
    }
    setLastPressed(new Date().getTime());
  };
  const onCancelHandler = () => {
    setIsVisibleModel(false);
  };
  const onAddHandler = (newTodo: Todo) => {
    if (newTodo) {
      setTodos((prev) => [...prev, newTodo]);
      onCancelHandler();
    }
  };
  const onRemoveHandler = (todoId: number) => () => {
    if (!todoId) return;
    setTodos((todos) => todos.filter(({ id }) => id !== todoId));
  };

  const openNewTodoModel = () => {
    setIsVisibleModel(true);
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Pressable style={styles.addButton} onPress={openNewTodoModel}>
          <Text style={{ fontSize: 20, color: "white" }}>+ New</Text>
        </Pressable>
        <NewTodoModel
          onCancel={onCancelHandler}
          onAdd={onAddHandler}
          visible={isVisibleModel}
        />
        <View style={styles.todosContainer}>
          {todos.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <Image
                style={{ height: "60%", width: "60%" }}
                source={require("./assets/pp.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  fontWeight: "900",
                  textAlign: "center",
                }}
              >
                Add Some Todos To Achieve Them
              </Text>
            </View>
          ) : (
            <FlatList
              data={todos}
              keyExtractor={(item, index) => {
                return String(item.id);
              }}
              renderItem={({ item }) => (
                <TodoItem
                  item={item}
                  onRemove={onRemoveHandler}
                  onToggle={onToggleHandler}
                />
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    maxHeight: "100%",
    overflow: "hidden",
    position: "relative",
    flex: 1,
  },

  todosContainer: {
    flex: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 10,
    color: "white",
    backgroundColor: "#002275",
    marginRight: 20,
    zIndex: 100,
    padding: 18,
    borderBottomRightRadius: 20,
    borderColor: "white",
    borderWidth: 4,
  },

  Todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
  },
});
