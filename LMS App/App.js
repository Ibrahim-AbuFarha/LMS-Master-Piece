import AppNavigation from "./navigation/appNavigation";
import { StatusBar } from "react-native";
import { ClassRoomProvider } from "./store/ClassRoomsContext";
import { UserProvider } from "./store/authContext";
export default function App() {
  return (
    <UserProvider>
      <ClassRoomProvider>
        <AppNavigation />
      </ClassRoomProvider>
    </UserProvider>
  );
}
