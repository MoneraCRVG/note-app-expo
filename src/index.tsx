import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Note } from './datatypes';
import { createDatabase, deleteNote, pushNote, readDatabase } from './database';
import { NoteItem } from './components/Notes';
import { FontAwesome5 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeProvider, useTheme } from './themeContext';

const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

export const Main = () => {
    const [notes, setNotes] = useState<Note[]>([])
      const [noteContent, setNoteContent] = useState<string>("");
      const { darkMode, toggleDarkMode } = useTheme();
      createDatabase();
      useEffect(() => {
        const getNotesFromDB = async () => {
          const notesFromDB = await readDatabase()
          setNotes(notesFromDB)
        }
        getNotesFromDB()
      }, [])
      const addNote = (note: Note) => {
        setNotes([...notes, note])
        pushNote(note);
      }
    
    
      const deleteNoteHandler = async (id: number) => {
        let newNoteArray = notes.filter((note) => note.id !== id)
        setNotes(newNoteArray);
        await deleteNote(id);
      }
    return (<View style={[styles.container, darkMode && styles.containerDark]}>
      <StatusBar style={darkMode ? "light" : "dark"} />
    
      <Pressable
  onPress={toggleDarkMode}
  style={[
    styles.themeToggleButton,
    darkMode && styles.themeToggleButtonDark
  ]}
>
  <MaterialIcons
    name="dark-mode"
    size={24}
    color={darkMode ? 'black' : 'white'}
  />
</Pressable>

    
      <View style={styles.notesContainer}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <View key={note.id} style={[styles.noteItemWrapper, darkMode && styles.noteItemWrapperDark]}>
              <NoteItem note={note} />
              <Pressable onPress={() => deleteNoteHandler(note.id)} style={[styles.iconButton, darkMode && styles.iconButtonDark]}>
                <FontAwesome5 name="trash" size={20} color={darkMode ? "gray" : "black"} />
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={[styles.emptyText, darkMode && styles.emptyTextDark]}>Sem anotações</Text>
        )}
      </View>
    
      <View style={[styles.bottomBar, darkMode && styles.bottomBarDark]}>
        <TextInput
          value={noteContent}
          onChangeText={setNoteContent}
          style={[styles.input, darkMode && styles.inputDark]}
          placeholder="Escreva uma anotação..."
          placeholderTextColor={darkMode ? "#ccc" : "#888"}
        />
        <Pressable onPress={() => setNoteContent('')} style={[styles.iconButton, darkMode && styles.iconButtonDark]}>
          <Entypo name="cross" size={20} color={darkMode ? "white" : "black"} />
        </Pressable>
        <Pressable
          onPress={() => {
            const note: Note = {
              id: Date.now(),
              content: noteContent,
            };
            if (note.content !== '') addNote(note);
          }}
          style={[styles.iconButton, darkMode && styles.iconButtonDark]}
        >
          <Entypo name="check" size={20} color={darkMode ? "white" : "black"} />
        </Pressable>
      </View>
    </View>)
}
const styles = StyleSheet.create({
    themeToggleButton: {
        padding: 10,
        borderRadius: 999, // perfectly round (like borderRadius: "50%")
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4, // Android
      
      },
      themeToggleButtonDark: {
        backgroundColor: '#fff',
      },
    emptyText: {
      textAlign: 'center',
      color: '#aaa',
      fontSize: 16,
      marginTop: 40,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    background: {
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
    },
    notesContainer: {
      flex: 1,
      padding: 16,
    },
    noteItemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      justifyContent: 'space-between',
      backgroundColor: '#f9f9f9',
      padding: 12,
      borderRadius: 10,
      elevation: 2, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    bottomBar: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 10,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    iconButton: {
      padding: 8,
      backgroundColor: '#ddd',
      borderRadius: 8,
    },
    iconButtonDark: {
        padding: 8,
        backgroundColor: '#262626',
        borderRadius: 8,
      },
    containerDark: {
      backgroundColor: '#121212',
    },
    emptyTextDark: {
      color: '#ccc',
    },
    noteItemWrapperDark: {
      backgroundColor: '#1e1e1e',
      shadowColor: '#000',
    },
    bottomBarDark: {
      backgroundColor: '#1a1a1a',
    },
    inputDark: {
      backgroundColor: '#2a2a2a',
      color: '#fff',
      borderColor: '#555',
    },
  
  });
  