import React, { useRef, useEffect } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

// Obtenir les dimensions de l'écran
const { width } = Dimensions.get('window');

// Animation du graphique ECG
const ECGAnimation = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(0);

      Animated.timing(animation, {
        toValue: -width * 1.5,
        duration: 3000, 
        useNativeDriver: true,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [-width * 1.5, 0],
    outputRange: [0, width * 1.5],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Svg height={100} width={width * 3}> {/* Réduire la hauteur à 100 pour éviter un grand espace */}
          <Polyline
            points={`0,50 
              38,50 
              44,38 
              50,50 
              57,50 
              63,60 
              72,14 
              80,68 
              84,50 
              97,50 
              103,45 
              110,50 
              150,50
              ${width + 0},50 
              ${width + 38},50 
              ${width + 44},38 
              ${width + 50},50 
              ${width + 57},50 
              ${width + 63},60 
              ${width + 72},14 
              ${width + 80},68 
              ${width + 84},50 
              ${width + 97},50 
              ${width + 103},45 
              ${width + 110},50 
              ${width + 150},50
              ${width * 2 + 0},50 
              ${width * 2 + 38},50 
              ${width * 2 + 44},38 
              ${width * 2 + 50},50 
              ${width * 2 + 57},50 
              ${width * 2 + 63},60 
              ${width * 2 + 72},14 
              ${width * 2 + 80},68 
              ${width * 2 + 84},50 
              ${width * 2 + 97},50 
              ${width * 2 + 103},45 
              ${width * 2 + 110},50 
              ${width * 2 + 150},50`}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, 
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ECGAnimation;
