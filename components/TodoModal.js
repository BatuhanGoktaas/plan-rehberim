import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";

export default class TodoModal extends Component {
  state = {
    name: this.props.list.name,
    color: this.props.list.color,
    todos: this.props.list.todos,
  };

  renderTodo = (todo) => {
    return (
      <View style={styles.todoContainer}>
        <Text>{todo.title}</Text>
      </View>
    );
  };

  render() {
    const taskCount = this.state.todos.length;
    const completedCount = this.state.todos.filter((todo) => todo.completed).length;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={[styles.section, styles.header, { borderBottomColor: this.state.color }]}>
          <Text style={styles.title}>{this.state.name}</Text>
          <Text style={styles.taskCount}>
            {taskCount} plandan {completedCount} tamamlanan
          </Text>
        </View>
        <View style={([styles.section], { flex: 3 })}>
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) => this.renderTodo(item)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="padding">
          <TextInput style={[styles.input, { borderColor: this.state.color }]} />
          <TouchableOpacity style={[styles.addTodo, { backgroundColor: this.state.color }]}>
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
