import { StyleSheet, View } from "react-native";
import { DocumentSelector } from "../components/SelectDoc";

export default function Index() {
  return (
    <View style={styles.container}>
      <DocumentSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
