// WebLinearGradient.js
import React from 'react';
import { View } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

const WebLinearGradient = ({ children, style, ...props }) => {
  return (
    <View style={[style, { overflow: 'hidden' }]}>
      <ExpoLinearGradient style={{ ...StyleSheet.absoluteFillObject }} {...props} />
      {children}
    </View>
  );
};

export default WebLinearGradient;
