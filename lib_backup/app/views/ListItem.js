import React from "react";
import PropTypes from "prop-types";

var { Component } = React;
import ReactNative from "react-native";

const { View, Text, TouchableHighlight, StyleSheet, Image } = ReactNative;

const styles = StyleSheet.create({
  listContent: {
    borderBottomWidth: 1,
    borderColor: "#cccccc"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12
  },
  itemIcon: {
    width: 22,
    height: 22,
    marginRight: 10
  },
  itemTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16
  },
  itemContent: {
    marginRight: 10
  }
});

class ListItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  onPress() {
    if (!this.props.onPress) {
      return;
    }
    this.props.onPress();
  }

  render() {
    return (
      <TouchableHighlight
        style={[styles.listContent]}
        underlayColor="#dddddd"
        title={this.title}
        onPress={this.props.onPress}
      >
        <View style={[styles.listItem]}>
          <Image source={this.props.source} style={[styles.itemIcon]} />
          <Text style={styles.itemTitle}>{this.props.title}</Text>
          <Text style={styles.itemContent}>{this.props.content}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
