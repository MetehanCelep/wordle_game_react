import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { colors,CLEAR,ENTER} from "./src/constants";
import Keyboard from "./src/components/Keyboard";
import { useState } from 'react';

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...(arr.map((rows) => [...rows]))];
};

export default function App() {
  const word = "ömrüm";
  const letters = word.split('');
  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows);
    if(key==CLEAR)
    {
        const prevCol=curCol-1;
        if(prevCol>=0){
          updatedRows[curRow][prevCol]="";
        setRows(updatedRows);
        setCurCol(prevCol);
        
        }
        return;
    }
    if(key==ENTER){
      if(curCol==rows[0].length){
        setCurRow(curRow+1);
        setCurCol(0);
      }
      
      
      return;
    }


    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };


  const getCellBGColor=(row,col)=>{
    const letter=rows[row][col];
    if(row>=curRow){
      return colors.black;

    }
    
    if(letter ==letters[col]){
      return colors.primary;
    }
    if(letters.includes(letter)){
      return colors.secondary;
    }
    return colors.darkgrey;

  }
  const gelAllLEttersWithColor = (color)=>{
    return rows.flatMap((row,i)=>row.filter((cell,j)=>getCellBGColor(i,j)==color));
  }

  const greenCaps=gelAllLEttersWithColor(colors.primary);
  const yellowCaps=gelAllLEttersWithColor(colors.secondary);
  const greyCaps=gelAllLEttersWithColor(colors.darkgrey);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="Light" />
      <Text style={styles.title}>ÖMÜR TÖRPÜM</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j) ?
                      colors.lightgrey :
                      colors.darkgrey,
                    backgroundColor: getCellBGColor(i,j)
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard onKeyPressed={onKeyPressed} 
      greenCaps={greenCaps}
      yellowCaps={yellowCaps}
      greyCaps={greyCaps}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: "row",
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.darkgrey,
    aspectRatio: 1,
    height: 30,
    margin: 3,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
});
