import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";

var { width, height } = Dimensions.get("window");
type Props = {};
export default class ContractList extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.props.buttons.map((elem, index) => {
          return (
            <Card
              title={"币价：" + elem[3] + " RMB"}
              containerStyle={styles.Card}
              titleStyle={styles.Title}
              //dividerStyle={{ display: "none" }}
            >
              <Text
                style={{
                  marginBottom: 10,
                  color: "white",
                  textAlign: "center"
                }}
              >
                数量：{elem[2]} ETH
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                  color: "white",
                  textAlign: "center"
                }}
              >
                {elem[1] === "Sell" ? "卖家ID" : "买家ID"}：{elem[4]}
              </Text>
              <Button
                title="查看"
                type="clear"
                buttonStyle={styles.Button}
                onPress={() =>
                  navigate("Contract2", {
                    contractAddr: elem[0],
                    contractName: elem[1],
                    contractTitle: elem[1] === "Sell" ? "卖单" : "买单"
                  })
                }
                color="#1E90FF"
              />
            </Card>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#3C3C3C",
    width: 0.4 * width,
    height: 160,
    margin: 0.05 * width,
    borderRadius: 30,
    shadowColor: "darkgrey",
    shadowOffset: { width: 4, height: 4 }
  },
  Title: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
