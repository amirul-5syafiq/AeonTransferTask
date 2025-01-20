import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import dayjs from "dayjs";

const response = {
  data: [
    {
      refId: "123ABC",
      transferDate: "2024-10-15T12:34:56Z",
      recipientName: "John Doe",
      transferName: "Salary Payment",
      amount: 1500.0,
    },
    {
      refId: "456DEF",
      transferDate: "2024-09-21T09:12:45Z",
      recipientName: "Jane Smith",
      transferName: "Invoice Payment",
      amount: 2300.75,
    },
    {
      refId: "789GHI",
      transferDate: "2024-10-05T16:18:30Z",
      recipientName: "Robert Brown",
      transferName: "Refund",
      amount: -500.0,
    },
    {
      refId: "101JKL1",
      transferDate: "2024-08-30T11:47:22Z",
      recipientName: "Emily Davis",
      transferName: "Bonus Payment",
      amount: 1200.0,
    },
    {
      refId: "234ABC",
      transferDate: "2024-10-15T14:00:12Z",
      recipientName: "Alice Green",
      transferName: "Payment for Services",
      amount: 2500.0,
    },
    {
      refId: "567DEF",
      transferDate: "2024-10-15T16:25:43Z",
      recipientName: "Charlie Brown",
      transferName: "Gift Payment",
      amount: 100.0,
    },
    {
      refId: "890GHI",
      transferDate: "2024-10-15T18:50:02Z",
      recipientName: "Diana White",
      transferName: "Refund",
      amount: -750.0,
    },
    {
      refId: "112JKL2",
      transferDate: "2024-10-15T20:35:12Z",
      recipientName: "Eva Black",
      transferName: "Bonus Payment",
      amount: 2000.0,
    },
    {
      refId: "113MNO",
      transferDate: "2024-10-15T22:15:33Z",
      recipientName: "Frank Hill",
      transferName: "Reimbursement",
      amount: 400.0,
    },
    {
      refId: "345DEF",
      transferDate: "2024-10-06T11:15:02Z",
      recipientName: "Hannah Lee",
      transferName: "Bonus Payment",
      amount: 700.0,
    },
    {
      refId: "678DEF",
      transferDate: "2024-10-06T17:45:01Z",
      recipientName: "Karen White",
      transferName: "Gift Payment",
      amount: 50.0,
    },
    {
      refId: "789JKL5",
      transferDate: "2024-09-21T08:30:10Z",
      recipientName: "Louis Black",
      transferName: "Service Payment",
      amount: 1100.0,
    },
    {
      refId: "890MNO",
      transferDate: "2024-09-21T10:45:22Z",
      recipientName: "Monica Green",
      transferName: "Refund",
      amount: -150.0,
    },
    {
      refId: "901DEF",
      transferDate: "2024-09-21T13:00:33Z",
      recipientName: "Nick Orange",
      transferName: "Invoice Payment",
      amount: 900.0,
    },
  ],
};

export default function TransferScreen({ navigation }) {
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const datesPerPage = 3;

  const groupedData = response.data.reduce((acc, item) => {
    const date = dayjs(item.transferDate).format("YYYY-MM-DD");
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const allDates = Object.keys(groupedData);
  const filteredDates = filterDate
    ? allDates.filter((date) => date.startsWith(filterDate))
    : allDates;

  const totalDates = filteredDates.length;
  const totalPages = Math.ceil(totalDates / datesPerPage);

  const startIdx = (currentPage - 1) * datesPerPage;
  const endIdx = startIdx + datesPerPage;
  const currentData = filteredDates.slice(startIdx, endIdx);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transferItem}
      onPress={() =>
        navigation.navigate("TransferDetailScreen", {
          transferData: item,
        })
      }
    >
      <Text style={styles.recipientName}>{item.recipientName}</Text>
      <Text
        style={[styles.amount, { color: item.amount < 0 ? "red" : "green" }]}
      >
        {`${item.amount < 0 ? "- RM" : "RM"}${Math.abs(item.amount).toFixed(
          2
        )}`}
      </Text>
    </TouchableOpacity>
  );

  const renderPage = ({ item: date }) => {
    const displayDate = dayjs(date).format("D MMM YYYY");
    return (
      <View style={styles.combinedContainer}>
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>{displayDate}</Text>
        </View>
        <FlatList
          data={groupedData[date]}
          keyExtractor={(item) => item.refId}
          renderItem={renderItem}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Enter date (YYYY-MM-DD)"
          value={filterDate}
          onChangeText={setFilterDate}
        />
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={currentData}
          keyExtractor={(item) => item}
          renderItem={renderPage}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Text style={styles.pageButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>{currentPage}</Text>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          <Text style={styles.pageButtonText}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    position: "fixed",
    top: 77,
    left: 0,
    right: 0,
    backgroundColor: "#F5F5F5",
    zIndex: 1,
    padding: 10,
  },
  filterInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    marginTop: 60,
    paddingBottom: 80,
  },
  flatListContainer: {
    paddingBottom: 80,
  },
  combinedContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
  },

  dateSection: {
    backgroundColor: "#E0E0E0",
    padding: 3,
    marginBottom: 0,
  },
  dateText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  transferItem: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    elevation: 2,
  },
  recipientName: {
    fontSize: 15,
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
  },
  paginationContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 5,
  },
  pageButton: {
    padding: 10,
  },
  pageButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#434343",
  },
  pageIndicator: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
