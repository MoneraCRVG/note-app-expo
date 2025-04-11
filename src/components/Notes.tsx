import { Note } from "../datatypes";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { deleteNote } from "../database";
import { Pressable } from "react-native";
import { useTheme } from "../themeContext";

export const NoteItem: React.FC<{ note: Note }> = ({ note }) => {
const { darkMode, toggleDarkMode } = useTheme();
    return(
  <View>
    <Text style={[styles.content, darkMode && styles.contentDark]}>{note.content}</Text>
    
  </View>
)};


const styles = StyleSheet.create({
    content: {
        color: 'black'
    },
    contentDark: {
        color: 'white'
    }
});