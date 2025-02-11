import React, { useState } from "react";
import {
  Share,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Definir tipos de navegación
type RootStackParamList = {
  Home: undefined;
  InformeAyudasAgricultores: {
    edad: string;
    explotacion: string;
    planEmpresarial: string;
    resultado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorAyudasAgricultores: React.FC = () => {
  const [edad, setEdad] = useState<string>("");
  const [explotacion, setExplotacion] = useState<string>("");
  const [planEmpresarial, setPlanEmpresarial] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    const edadNum = parseInt(edad);
    if (
      isNaN(edadNum) ||
      (explotacion !== "S" && explotacion !== "N") ||
      (planEmpresarial !== "S" && planEmpresarial !== "N")
    ) {
      setResultado("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (
      edadNum >= 18 &&
      edadNum <= 40 &&
      explotacion === "S" &&
      planEmpresarial === "S"
    ) {
      setResultado("Cumples con los requisitos para recibir la ayuda.");
    } else {
      setResultado("No cumples con los requisitos para esta ayuda.");
    }
  };

  React.useEffect(() => {
    Alert.alert(
      "Aviso importante",
      "Este simulador es una herramienta orientativa y no garantiza la concesión de la ayuda. Consulta con el organismo competente.",
      [{ text: "Entendido" }]
    );
  }, []);

  const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Descarga la app Ayudas Públicas 2025 y descubre todas las ayudas disponibles. ¡Haz clic aquí para descargarla! https://play.google.com/store/apps/details?id=com.sigleto.Ayudas",
      });
    } catch (error) {
      console.error("Error al compartir", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Simulador Ayudas Agricultores Jóvenes</Text>

      <Text>Edad:</Text>
      <TextInput
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholder="Ingresa tu edad"
        style={styles.input}
      />

      <Text>¿Eres titular de una explotación agraria? (S/N):</Text>
      <TextInput
        value={explotacion}
        onChangeText={(text) => setExplotacion(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>¿Presentas un plan empresarial viable? (S/N):</Text>
      <TextInput
        value={planEmpresarial}
        onChangeText={(text) => setPlanEmpresarial(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {resultado && (
        <>
          <Text style={styles.result}>{resultado}</Text>
          {resultado.includes("Cumples con los requisitos") && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeAyudasAgricultores", {
                  edad,
                  explotacion,
                  planEmpresarial,
                  resultado,
                })
              }
              style={styles.boton}
            >
              <Text style={styles.letras}>GENERAR INFORME DETALLADO</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Home" as never)}
            style={styles.boton}
          >
            <Text style={styles.letra}>VOLVER</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2a9d8f",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4caf50",
  },
  boton: {
    backgroundColor: "#c13855",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "40%",
    marginTop: 20,
    height: 40,
  },
  letra: { fontSize: 16, color: "white", fontWeight: "bold" },
  letras: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  shareIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});

export default SimuladorAyudasAgricultores;
