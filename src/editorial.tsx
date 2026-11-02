import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Category, categories } from "./domain/types";
import { colors } from "./ui";

type IconName = React.ComponentProps<typeof Icon>["name"];
export const categoryArt: Record<Category, { color: string; icon: IconName }> =
  {
    Desempleo: { color: "#FFD0AE", icon: "briefcase-outline" },
    "Ayudas sociales": { color: "#FFB9AD", icon: "hand-heart-outline" },
    Vivienda: { color: "#BCD4FF", icon: "home-outline" },
    Familias: { color: "#FFE178", icon: "human-male-female-child" },
    "Becas y estudios": { color: "#D9C9FF", icon: "school-outline" },
    Emprendimiento: { color: "#FFC29D", icon: "rocket-launch-outline" },
    Discapacidad: { color: "#C9D7FF", icon: "human-wheelchair" },
    Agricultura: { color: "#E8D5B7", icon: "sprout-outline" },
    Dependencia: { color: "#F5C9DD", icon: "hands-pray" },
    Energía: { color: "#FFE178", icon: "lightning-bolt-outline" },
  };
export function Mosaic({
  onSelect,
}: {
  onSelect: (category: Category) => void;
}) {
  return (
    <View testID="category-mosaic" style={e.mosaic}>
      {categories.map((category, i) => {
        const art = categoryArt[category];
        const wide = i === 2 || i === 5;
        return (
          <Pressable
            key={category}
            accessibilityRole="button"
            accessibilityLabel={category}
            onPress={() => onSelect(category)}
            style={({ pressed }) => [
              e.tile,
              {
                backgroundColor: art.color,
                width: wide ? "100%" : "48%",
                borderTopRightRadius: i % 3 === 0 ? 46 : 8,
                opacity: pressed ? 0.7 : 1,
              },
              wide && e.wideTile,
            ]}
          >
            <Icon name={art.icon} size={wide ? 48 : 38} color={colors.ink} />
            <Text style={[e.tileLabel, wide && { flex: 1 }]}>{category}</Text>
            {wide && (
              <Icon name="arrow-top-right" size={28} color={colors.ink} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
export function OpportunityArt() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={e.art}
    >
      <View style={e.artCircle}>
        <Icon name="arrow-top-right" size={60} color={colors.ink} />
      </View>
      <View style={e.artPaper}>
        <Icon name="check-all" size={35} color={colors.ink} />
        <View style={e.artLine} />
        <View style={[e.artLine, { width: 30 }]} />
      </View>
      <Text style={e.star}>✳</Text>
    </View>
  );
}
export const e = StyleSheet.create({
  kicker: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "800",
    color: colors.ink,
  },
  cover: { gap: 18, paddingTop: 10, paddingBottom: 10 },
  coverTitle: {
    fontSize: 43,
    lineHeight: 46,
    letterSpacing: -1.8,
    fontWeight: "900",
    color: colors.ink,
    maxWidth: 520,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    paddingLeft: 14,
    paddingRight: 5,
    gap: 8,
    minHeight: 62,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    color: colors.ink,
    paddingVertical: 16,
  },
  searchGo: {
    backgroundColor: colors.ink,
    borderRadius: 11,
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  orient: {
    backgroundColor: "#FF715B",
    padding: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  orientTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "800",
    color: colors.ink,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 18,
    borderTopWidth: 1,
    borderColor: colors.ink,
    paddingTop: 16,
  },
  sectionNumber: { fontSize: 12, color: colors.muted, fontWeight: "700" },
  mosaic: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  tile: {
    minHeight: 146,
    borderRadius: 8,
    padding: 14,
    gap: 20,
    justifyContent: "space-between",
  },
  wideTile: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tileLabel: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  simulator: {
    backgroundColor: "#D9C9FF",
    padding: 24,
    borderRadius: 8,
    borderBottomRightRadius: 48,
    gap: 16,
    overflow: "hidden",
  },
  simulatorTitle: {
    fontSize: 31,
    lineHeight: 35,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: colors.ink,
  },
  art: { height: 125, width: 195, alignSelf: "flex-end" },
  artCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE178",
    position: "absolute",
    right: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  artPaper: {
    width: 81,
    height: 104,
    backgroundColor: colors.paper,
    transform: [{ rotate: "-12deg" }],
    borderWidth: 2,
    borderColor: colors.ink,
    padding: 12,
    gap: 9,
    position: "absolute",
    left: 13,
    top: 15,
  },
  artLine: { height: 3, width: 48, backgroundColor: colors.ink },
  star: {
    color: colors.ink,
    position: "absolute",
    right: 35,
    bottom: -9,
    fontSize: 47,
  },
  listing: {
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingVertical: 22,
    gap: 12,
  },
  listingTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconDisc: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  textLink: { paddingVertical: 12, minHeight: 44, alignSelf: "flex-start" },
  linkText: { color: colors.primary, fontSize: 16, fontWeight: "800" },
  detailTop: { borderTopWidth: 6, paddingTop: 20, gap: 15 },
  section: {
    paddingVertical: 22,
    borderTopWidth: 1,
    borderColor: colors.line,
    gap: 16,
  },
  amount: { padding: 22, backgroundColor: "#FFE178", borderRadius: 4, gap: 12 },
  step: { flexDirection: "row", alignItems: "flex-start", gap: 14 },
  stepNumber: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: "800",
    minWidth: 38,
  },
  sticky: {
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.paper,
    borderTopWidth: 1,
    borderColor: colors.line,
  },
  progress: { flexDirection: "row", gap: 6, marginVertical: 8 },
  progressLine: { height: 5, flex: 1, borderRadius: 3 },
  question: {
    gap: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  questionNumber: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  result: {
    backgroundColor: "#E4DBFA",
    borderTopWidth: 6,
    borderColor: "#7950C8",
    padding: 22,
    gap: 18,
  },
});
