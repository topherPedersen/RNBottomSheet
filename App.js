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
          <View style={{width: '100%', height: 50, alignContent: 'center', flexDirection: 'row', backgroundColor: 'pink'}}>
            {/*
            <Text style={{alignSelf: 'center'}}>Schedule Now</Text>
            <Text style={{alignSelf: 'center', color: 'blue'}}>X</Text>
            */}
            <View style={{backgroundColor: 'red', width: '33%', height: '100%'}}>
            </View>
            <View style={{backgroundColor: 'yellow', width: '33%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{}}>Schedule Now</Text>
            </View>
            <View style={{backgroundColor: 'green', width: '33%', height: '100%'}}>
            </View>
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