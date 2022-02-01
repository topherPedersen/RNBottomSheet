import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const App = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['75%'], []);

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
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          {/* BottomSheet Heading Container */}
          <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginBottom: 7}}>Schedule Now</Text>
          </View>
          {/* Horizontal Line (Divide BottomSheet Heading from BottomSheet Content) */}
          <View style={{width: '100%', height: 1, backgroundColor: '#C0C0C0'}}></View>
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