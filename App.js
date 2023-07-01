import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import DrawerNavigation from "./navigation/drawer";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}
