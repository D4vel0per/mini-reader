import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DocumentSelector } from "../components/SelectDoc";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <DocumentSelector />
      </View>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
