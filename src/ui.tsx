import React from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export const colors = {
  ink: "#172343",
  primary: "#304BC4",
  wash: "#E6E9FC",
  paper: "#FAF6EE",
  white: "#FFFFFF",
  muted: "#5B6172",
  line: "#DAD5CC",
  amber: "#FFF0CD",
  amberInk: "#6F4B0A",
};
export function Page({
  children,
  footer,
}: React.PropsWithChildren<{ footer?: React.ReactNode }>) {
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.paper }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={s.page}
      >
        <View style={s.content}>{children}</View>
      </ScrollView>
      {footer}
    </SafeAreaView>
  );
}
export function Title({ children }: React.PropsWithChildren) {
  return (
    <Text accessibilityRole="header" style={s.title}>
      {children}
    </Text>
  );
}
export function Heading({ children }: React.PropsWithChildren) {
  return (
    <Text accessibilityRole="header" style={s.heading}>
      {children}
    </Text>
  );
}
export function Body({ children }: React.PropsWithChildren) {
  return <Text style={s.body}>{children}</Text>;
}
export function Card({ children }: React.PropsWithChildren) {
  return <View style={s.card}>{children}</View>;
}
export function Notice({ children }: React.PropsWithChildren) {
  return (
    <View style={s.notice}>
      <Text style={s.noticeText}>{children}</Text>
    </View>
  );
}
export function Button({
  label,
  onPress,
  secondary = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        { opacity: disabled ? 0.45 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={[s.buttonText, secondary && { color: colors.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}
export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        s.chip,
        selected && s.selectedChip,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text
        style={{
          color: selected ? colors.white : colors.ink,
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
export async function openSource(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      "No se pudo abrir el enlace",
      "Comprueba la conexión o vuelve a intentarlo. La ficha sigue disponible sin conexión.",
    );
  }
}
export const s = StyleSheet.create({
  page: { padding: 20, paddingBottom: 36 },
  content: { width: "100%", maxWidth: 760, alignSelf: "center", gap: 16 },
  title: {
    fontSize: 34,
    lineHeight: 39,
    color: colors.ink,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  heading: {
    fontSize: 21,
    lineHeight: 28,
    color: colors.ink,
    fontWeight: "700",
  },
  body: { fontSize: 16, lineHeight: 25, color: colors.ink },
  muted: { fontSize: 14, lineHeight: 21, color: colors.muted },
  card: {
    backgroundColor: "#F0EBE2",
    borderRadius: 8,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  notice: {
    borderLeftWidth: 3,
    borderColor: "#D89B25",
    backgroundColor: colors.amber,
    padding: 16,
  },
  noticeText: { color: colors.amberInk, fontSize: 14, lineHeight: 22 },
  button: {
    minHeight: 48,
    padding: 14,
    backgroundColor: colors.primary,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
  },
  secondary: { backgroundColor: colors.wash },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    minHeight: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#A6A8B5",
    borderRadius: 12,
    padding: 14,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.ink,
  },
  hero: { backgroundColor: colors.ink, borderRadius: 24, padding: 25, gap: 18 },
  heroTitle: {
    fontSize: 35,
    lineHeight: 41,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: -0.8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#FFD878",
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.wash,
  },
  badgeText: { color: colors.primary, fontWeight: "700", fontSize: 12 },
});
