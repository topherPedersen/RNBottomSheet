import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

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
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          {/* Stuff Goes Here */}
        </View>
      </BottomSheet>
    </View>
  );
};

/*
 * Must wrap component with gestureHandlerRootHOC on Android or the 
 * <BottomSheet /> component will not respond to gestures to dismiss the 
 * <BottomSheet />.
 */
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