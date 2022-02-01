import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

// TODO: Can you fix prop drilling with the Context API?

const ScheduleNow = (props) => {
  return(
      <>
        {/* BottomSheet Cards */}
        <View style={{width: '90%', height: 85, marginTop: 30, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10}}></View>
        <View style={{width: '90%', height: 85, marginTop: 10, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={ () => props.scheduleAService() }>
            <Text>Schedule a Service</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{width: '90%', height: 85, marginTop: 10, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10}}></View>
        <View style={{width: '90%', height: 85, marginTop: 10, backgroundColor: 'white', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 10}}></View>
      </>
  );
};

const ScheduleAService = (props) => {
  return(
      <>
        {/* BottomSheet Options List */}
        {/* Option 1: Mammography */}
        <View style={{width: '100%', height: 50, marginTop: 25, alignContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
          <View style={{backgroundColor: 'pink', width: '80%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{}}>Mammography</Text>
          </View>
          <View style={{backgroundColor: 'purple', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'blue'}}>{'>'}</Text>
          </View>
        </View>
        {/* Horizontal Line (Divide BottomSheet Heading from BottomSheet Content) */}
        <View style={{width: '100%', height: 1, backgroundColor: '#C0C0C0'}}></View>
        {/* Option 2: Vaccines */}
        <View style={{width: '100%', height: 50, alignContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
          <View style={{backgroundColor: 'pink', width: '80%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{}}>Vaccines</Text>
          </View>
          <View style={{backgroundColor: 'purple', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'blue'}}>{'>'}</Text>
          </View>
        </View>
      </>
  );
};

const BottomSheetContent = (props) => {
  switch(props.componentToDisplay) {
    case 'ScheduleNow':
      return <ScheduleNow scheduleAService={props.scheduleAService} />;
      break;
    case 'ScheduleAService':
      return <ScheduleAService />;
      break;
    default:
      return null;
  }
};

const LeftBottomSheetNavButton = (props) => {
  if (props.hide) {
    return null;
  }

  return(
    <TouchableWithoutFeedback onPress={props.goBackToScheduleNow}>
      <Text style={{color: 'blue'}}>{'<'}</Text>
    </TouchableWithoutFeedback>
  );
}; 


const App = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['75%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const scheduleAService = () => {
    setBottomSheetHeadingText('Schedule A Service');
    setComponentToDisplay('ScheduleAService');
    setHideLeftBottomSheetNavButton(false);
  }

  const goBackToScheduleNow = () => {
    setBottomSheetHeadingText('Schedule Now');
    setComponentToDisplay('ScheduleNow');
    setHideLeftBottomSheetNavButton(true);
  }

  const [bottomSheetHeadingText, setBottomSheetHeadingText] = useState('Schedule Now');
  const [componentToDisplay, setComponentToDisplay] = useState('ScheduleNow');
  const [hideLeftBottomSheetNavButton, setHideLeftBottomSheetNavButton] = useState(true);

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
          <View style={{width: '100%', height: 50, alignContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
            <View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <LeftBottomSheetNavButton hide={hideLeftBottomSheetNavButton} goBackToScheduleNow={goBackToScheduleNow} />
            </View>
            <View style={{backgroundColor: 'white', width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{}}>{bottomSheetHeadingText}</Text>
            </View>
            <View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'blue'}}>X</Text>
            </View>
          </View>
          {/* Horizontal Line (Divide BottomSheet Heading from BottomSheet Content) */}
          <View style={{width: '100%', height: 1, backgroundColor: '#C0C0C0'}}></View>
          <BottomSheetContent 
            componentToDisplay={componentToDisplay} 
            scheduleAService={scheduleAService} 
          />
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