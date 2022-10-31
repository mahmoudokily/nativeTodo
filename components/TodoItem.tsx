import React from "react";
import { Button, Pressable, View, Text, StyleSheet } from "react-native";
import { Todo } from "../types";

type TodoItemProps = {
  onToggle: (item: Todo) => () => void;
  onRemove: (id: number) => () => void;
  item: Todo;
};
export const TodoItem: React.FC<TodoItemProps> = ({
  onToggle,
  onRemove,
  item,
}) => {
  return (
    <Pressable onPress={onToggle(item)}>
      <View
        style={{
          backgroundColor: "#003eaa",
          ...styles.todoItem,
        }}
      >
        <Text
          style={{
            textDecorationLine: item.isComplete ? "line-through" : "none",

            ...styles.text,
          }}
        >
          {item.text}
        </Text>
        <Button onPress={onRemove(item.id)} title={"X"} color="white" />
      </View>
    </Pressable>
  );
};
export default TodoItem;
const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: "white",
    fontSize: 18,
  },
  todoItem: {
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    marginBottom: 8,
  },
});
