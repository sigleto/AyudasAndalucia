import React, { useState } from "react";
import {
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
import AnuncioInt from "../Anuncios/AnuncioIntersticial";
// Definir tipos de navegación
type RootStackParamList = {
  Home: undefined;
  InformeAyudasSectoriales: {
    sector: string;
    sostenibilidad: string;
    tamañoExplotacion: string;
    resultado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorAyudasSectoriales: React.FC = () => {
  const [sector, setSector] = useState<string>("");
  const [sostenibilidad, setSostenibilidad] = useState<string>("");
  const [tamañoExplotacion, setTamañoExplotacion] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    if (
      !sector ||
      (sostenibilidad !== "S" && sostenibilidad !== "N") ||
      (tamañoExplotacion !== "P" &&
        tamañoExplotacion !== "M" &&
        tamañoExplotacion !== "G")
    ) {
      setResultado("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (
      sostenibilidad === "S" &&
      (sector === "olivar" || tamañoExplotacion === "P")
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

  return (
    <View style={styles.container}>
      <AnuncioInt />
      <TouchableOpacity style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Simulador Ayudas Sectoriales</Text>

      <Text>Sector agrícola (ejemplo: olivar, hortofrutícola):</Text>
      <TextInput
        value={sector}
        onChangeText={setSector}
        placeholder="Ingresa el sector"
        style={styles.input}
      />

      <Text>¿Cumples con criterios de sostenibilidad? (S/N):</Text>
      <TextInput
        value={sostenibilidad}
        onChangeText={(text) => setSostenibilidad(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>Tamaño de la explotación (P/M/G):</Text>
      <TextInput
        value={tamañoExplotacion}
        onChangeText={(text) => setTamañoExplotacion(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa P, M o G"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {resultado && (
        <>
          <Text style={styles.result}>{resultado}</Text>
          {resultado.includes("Cumples con los requisitos") && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeAyudasSectoriales", {
                  sector,
                  sostenibilidad,
                  tamañoExplotacion,
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

export default SimuladorAyudasSectoriales;
