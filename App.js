import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableWithoutFeedback, Animated } from 'react-native';
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
          <View style={{backgroundColor: 'white', width: '80%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{marginLeft: 25}}>Mammography</Text>
          </View>
          <View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'blue'}}>{'>'}</Text>
          </View>
        </View>
        {/* Horizontal Line (Divide BottomSheet Heading from BottomSheet Content) */}
        <View style={{width: '100%', height: 1, backgroundColor: '#C0C0C0'}}></View>
        {/* Option 2: Vaccines */}
        <View style={{width: '100%', height: 50, alignContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
          <View style={{backgroundColor: 'white', width: '80%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{marginLeft: 25}}>Vaccines</Text>
          </View>
          <View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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

const BackButton = (props) => {
  const onBackButtonPressed = () => {
    props.goBackToScheduleNow();
    props.animateCloseButton();
  };

  if (props.hide) {
    return null;
  }

  return(
    <TouchableWithoutFeedback onPress={onBackButtonPressed}>
      <Text style={{color: 'blue'}}>{'<'}</Text>
    </TouchableWithoutFeedback>
  );
}; 

// Old Working <CloseButton /> with No Animation
/*
const CloseButton = (props) => {
  const onPressCloseButton = () => {
    props.bottomSheetRef.current.close();
  };

  return(
    <Animated.View style={{backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <TouchableWithoutFeedback onPress={onPressCloseButton}>
        <Text style={{color: 'blue'}}>X</Text>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}; 
*/

// New <CloseButton /> with Attempt to Add Animation (Will need to use absolute position. Will probably break some stuff at first.)
const CloseButton = (props) => {
  const closeButtonRef = useRef(null);

  const onPressCloseButton = () => {
    props.bottomSheetRef.current.close();
  };

  const closeButtonStandardPosition = useRef(new Animated.Value(310)).current; // Right Hand Side of Screen
  const closeButtonLeftPosition = useRef(new Animated.Value(0)).current; // Left Hand Side of Screen

  // TODO: Give this hook a different name to avoid confusion with other hook with same name
  const animateCloseButton = () => {
    // TODO: Test on Android
    Animated.timing(animatedValue, {
      toValue: closeButtonLeftPosition,
      duration: closeButtonStandardPosition,
      useNativeDriver: false, 
    }).start();
  };

  useEffect(() => {
    if (props.shouldAnimateCloseButton) {
      console.log("useEffect > setCloseButtonAnimationInitiated");
      props.setCloseButtonAnimationInitiated();
    } else {
      console.log("useEffect > else");
    }
  });



  return(
    <Animated.View 
      ref={closeButtonRef}
      style={{position: 'absolute', backgroundColor: 'white', width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', left: 310}}>
      <TouchableWithoutFeedback onPress={onPressCloseButton}>
        <Text style={{color: 'blue'}}>X</Text>
      </TouchableWithoutFeedback>
    </Animated.View>
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

  const animateCloseButton = () => {
    // alert("TODO: Add close button animation");
    setShouldAnimateCloseButton(true);
  };

  const [bottomSheetHeadingText, setBottomSheetHeadingText] = useState('Schedule Now');
  const [componentToDisplay, setComponentToDisplay] = useState('ScheduleNow');
  const [hideLeftBottomSheetNavButton, setHideLeftBottomSheetNavButton] = useState(true);
  const [shouldAnimateCloseButton, setShouldAnimateCloseButton] = useState(false);

  const setCloseButtonAnimationInitiated = () => {
    setShouldAnimateCloseButton(false);
  };

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
              <BackButton 
                hide={hideLeftBottomSheetNavButton} 
                goBackToScheduleNow={goBackToScheduleNow} 
                animateCloseButton={animateCloseButton} 
              />
            </View>
            <View style={{backgroundColor: 'white', width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{}}>{bottomSheetHeadingText}</Text>
            </View>
            <CloseButton 
              bottomSheetRef={bottomSheetRef} 
              shouldAnimateCloseButton={shouldAnimateCloseButton}
              setCloseButtonAnimationInitiated={setCloseButtonAnimationInitiated}
            />
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