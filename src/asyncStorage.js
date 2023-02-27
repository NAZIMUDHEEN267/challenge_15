import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem () {
   const item = await AsyncStorage.getItem("User");
    return JSON.parse(item);
}

export async function setItem (value) {
    const item = AsyncStorage.setItem("User", JSON.stringify({logged: value}));
    return item;
}