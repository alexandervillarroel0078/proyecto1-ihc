 
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current; // 🔹 nuevo fade
  const positionAnim = useRef(new Animated.Value(0)).current;

  const banners = [
    require("../../assets/baner/baner1.jpg"),
    require("../../assets/baner/baner2.png"),
    require("../../assets/baner/baner3.jpg"),
    require("../../assets/baner/baner4.png"),
  ];

  // 🔹 Movimiento automático con transición y fade
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;

      // 🔸 fade out
      Animated.timing(fadeAnim, {
        toValue: 0.4,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setActiveIndex(nextIndex);

        // 🔸 scroll horizontal
        scrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });

        // 🔸 fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    }, 6000); // cada 6 s

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={[styles.scroll, { opacity: fadeAnim }]} // 🔹 fade aplicado aquí
      >
        {banners.map((img, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.96, 1, 0.96],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.75, 1, 0.75],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.bannerWrapper,
                { transform: [{ scale }], opacity },
              ]}
            >
              <Image source={img} style={styles.bannerImage} />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {/* 🔹 Indicador deslizante */}
      <View style={styles.pagination}>
        {banners.map((_, i) => (
          <View key={i} style={styles.dotBase} />
        ))}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [0, width * (banners.length - 1)],
                    outputRange: [0, 16 * (banners.length - 1)],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  scroll: { width, height: 180 },
  bannerWrapper: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: width - 30,
    height: 180,
    borderRadius: 15,
    marginHorizontal: 15,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 10,
    position: "relative",
  },
  dotBase: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CFD8DC",
    marginHorizontal: 4,
  },
  indicator: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1E6F73",
    left: 4,
  },
});
