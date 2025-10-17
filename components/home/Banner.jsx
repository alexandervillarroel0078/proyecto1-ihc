import { useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef();

  const banners = [
    require("../../assets/baner/baner1.jpg"),
    require("../../assets/baner/baner2.png"),
    require("../../assets/baner/baner3.jpg"),
    require("../../assets/baner/baner4.png"),
  ];

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Scroll horizontal con paginación */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.scroll}
      >
        {banners.map((img, i) => (
          <Image key={i} source={img} style={styles.bannerImage} />
        ))}
      </ScrollView>

      {/* 🔹 Puntos de paginación */}
      <View style={styles.pagination}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeIndex === i ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  scroll: {
    width,
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
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#1E6F73",
  },
  dotInactive: {
    backgroundColor: "#cfd8dc",
  },
});
