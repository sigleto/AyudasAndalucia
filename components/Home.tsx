import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Definir el tipo para las rutas de navegación
type RootDrawerParamList = {
  Home: undefined;
  ListadoAyudas: undefined;
  FormularioGeneral: undefined;
};

type HomeScreenNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  "Home" | "FormularioGeneral"
>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const openMenu = (): void => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="menu"
        size={32}
        style={styles.menuIcon}
        onPress={openMenu}
      />
      <Image
        source={require("../assets/images/LogoJuan.png")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/images/icono.png")}
        style={styles.burocraciaImage}
      />

      <Text style={styles.titulo}>Bienvenido a Ayudas Públicas Andalucía</Text>
      <Text style={styles.descripcion}>
        Encuentra ayudas públicas ofrecidas por la Junta de Andalucía para
        vivienda, discapacidad, empleo y más, con información clara y accesible.
      </Text>

      <Text style={styles.descargo}>
        ** Esta aplicación no está afiliada ni representa a ninguna entidad
        gubernamental. **
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("ListadoAyudas")}
        style={styles.boton}
      >
        <Text style={styles.botonTexto}>ACCEDE A LAS DISTINTAS AYUDAS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("FormularioGeneral")}
        style={styles.boton}
      >
        <Text style={styles.botonTexto}>SIMULADOR GENERAL</Text>
      </TouchableOpacity>

      <View style={styles.privacidadContainer}>
        {/* Espacio para política de privacidad o avisos */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f7fa", // Fondo suave
  },
  menuIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    color: "#007AFF",
  },
  logo: {
    width: "60%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  burocraciaImage: {
    width: "60%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
    marginBottom: 15,
  },
  descargo: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#d9534f",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Sombra en Android
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  privacidadContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Home;
