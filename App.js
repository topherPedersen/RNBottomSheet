import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

/*
const ExampleWithHoc = gestureHandlerRootHOC(() => (
    <View>
      <DraggableBox />
    </View>
  );
);
*/

// NOTE: Working on iOS, gesture to dismiss NOT working on Android.
const App = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  function handleButtonPress() {
    bottomSheetRef.current.close();
  }

  // renders
  return (
    <View style={styles.container}>
      <BottomSheetModalProvider>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
          enablePanDownToClose={true}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Button title="CLOSE" onPress={handleButtonPress}/>
          </View>
        </BottomSheet>
      </BottomSheetModalProvider>
    </View>
  );
};

const AppContainer = gestureHandlerRootHOC(() => (<App />));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AppContainer;