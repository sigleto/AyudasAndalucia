import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Category } from "./domain/types";
export type MenuRoutes = {
  Inicio: undefined;
  Buscar: { category?: Category; query?: string } | undefined;
  Convocatorias: undefined;
  Favoritos: undefined;
  Orientación: undefined;
  Información: undefined;
};
export type RootRoutes = {
  Menu: NavigatorScreenParams<MenuRoutes>;
  Ficha: { id: string };
  Guía: { id: string };
};
export type Navigation = NativeStackNavigationProp<RootRoutes>;
