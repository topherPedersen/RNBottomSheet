import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const ScheduleNow = () => {
  return(
    <View style={styles.contentContainer}>
      {/* BottomSheet Heading Container */}
      <View style={{width: '100%', height: 50, alignContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        </View>
        <View style={{backgroundColor: 'white', width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{}}>Schedule Now</Text>
        </View>
        <View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'blue'}}>X</Text>
        </View>
      </View>
      {/* Horizontal Line (Divide BottomSheet Heading from BottomSheet Content) */}
      <View style={{width: '100%', height: 1, backgroundColor: '#C0C0C0'}}></View>
      {/* BottomSheet Cards */}
      <View style={{width: '90%', height: 85, marginTop: 30, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10}}></View>
      <View style={{width: '90%', height: 85, marginTop: 10, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={ () => alert("TODO: Add the animation!") }>
          <Text>Schedule a Service</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{width: '90%', height: 85, marginTop: 10, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10}}></View>
      <View style={{width: '90%', height: 85, marginTop: 10, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10}}></View>
    </View>
  );
};

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
        <ScheduleNow />
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