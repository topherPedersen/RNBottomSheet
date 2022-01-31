import React from 'react';
import {
  SafeAreaView,
  Text,
  Button,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>RNBottomSheet Demo</Text>
        <Button 
          title="Toggle BottomSheet" 
          onPress={ () => alert("TODO: Install & Toggle BottomSheet") } 
        />
      </SafeAreaView>
    );
  }
}

export default App;
