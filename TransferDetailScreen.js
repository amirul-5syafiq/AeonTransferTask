import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
} from "react-native";
import dayjs from "dayjs";

export default function TransferDetailScreen({ route, navigation }) {
  const { transferData } = route.params;

  const details = [
    { key: "Reference ID", value: transferData.refId },
    { key: "Recipient", value: transferData.recipientName },
    { key: "Transfer Name", value: transferData.transferName },
    {
      key: "Amount",
      value: `${transferData.amount < 0 ? "- RM" : "RM"}${Math.abs(
        transferData.amount
      ).toFixed(2)}`,
    },
    {
      key: "Date",
      value: dayjs(transferData.transferDate).format("D MMM YYYY"),
    },
  ];

  const renderDetailItem = ({ item }) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailKey}>{item.key}:</Text>
      <Text style={styles.detailValue}>{item.value}</Text>
    </View>
  );

  const onShare = async () => {
    try {
      await Share.share({
        message: `Transfer Details:\nReference ID: ${
          transferData.refId
        }\nRecipient: ${transferData.recipientName}\nTransfer Name: ${
          transferData.transferName
        }\nAmount: ${transferData.amount < 0 ? "- RM" : "RM"}${Math.abs(
          transferData.amount
        ).toFixed(2)}\nDate: ${dayjs(transferData.transferDate).format(
          "D MMM YYYY"
        )}`,
      });
    } catch (error) {
      console.error("Error sharing: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Container for the details */}
      <View style={styles.detailsContainer}>
        <FlatList
          data={details}
          keyExtractor={(item) => item.key}
          renderItem={renderDetailItem}
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <Text style={styles.buttonText}>Share Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  bottomContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailKey: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
  },
});
