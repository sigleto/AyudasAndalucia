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
import AnuncioInt from "../Anuncios/AnuncioIntersticial";

type RootStackParamList = {
  Home: undefined;
  InformeAyudasContratacionCuidadores: {
    discapacidad: string;
    parentesco: string;
    contratadaMujer: string;
    rentaFamiliar: string;
    resultado: string;
    cuantia: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorAyudasContratacionCuidadores: React.FC = () => {
  const [discapacidad, setDiscapacidad] = useState<string>("");
  const [parentesco, setParentesco] = useState<string>("");
  const [contratadaMujer, setContratadaMujer] = useState<string>("");
  const [rentaFamiliar, setRentaFamiliar] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const [cuantia, setCuantia] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    const rentaNum = parseFloat(rentaFamiliar);

    if (
      (discapacidad !== "S" && discapacidad !== "N") ||
      (parentesco !== "S" && parentesco !== "N") ||
      (contratadaMujer !== "S" && contratadaMujer !== "N") ||
      isNaN(rentaNum)
    ) {
      setResultado("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (
      discapacidad === "S" &&
      parentesco === "S" &&
      rentaNum <= 30000 // Límite de renta familiar como ejemplo
    ) {
      let baseCuantia = 4000; // Subvención base
      if (contratadaMujer === "S") {
        baseCuantia *= 1.1; // Incremento del 10% si es mujer
      }
      setResultado("Cumples con los requisitos para recibir la ayuda.");
      setCuantia(`Subvención estimada: ${baseCuantia.toFixed(2)}€.`);
    } else {
      setResultado("No cumples con los requisitos para esta ayuda.");
      setCuantia("");
    }
  };


  React.useEffect(() => {
    Alert.alert(
      "Aviso importante",
      "Este simulador es una herramienta orientativa y no contempla necesariamente todos los requisitos o condiciones específicos aplicables a cada caso particular. Por tanto, el resultado obtenido no es vinculante ni garantiza la concesión de la ayuda.\n\nPara obtener información oficial y confirmar tu situación, es imprescindible consultar con el organismo competente o acudir a las fuentes oficiales correspondientes.",
      [{ text: "Entendido" }]
    );
  }, []);

  return (
    <View style={styles.container}>
      <AnuncioInt />
      <Text style={styles.title}>Simulador Ayudas Contratación Cuidadores</Text>

      <Text>
        ¿El familiar a cuidar tiene un grado de discapacidad ≥75% o necesita
        atención continuada? (S/N):
      </Text>
      <TextInput
        value={discapacidad}
        onChangeText={(text) => setDiscapacidad(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>
        ¿Tienes relación de parentesco de primer grado con el familiar? (S/N):
      </Text>
      <TextInput
        value={parentesco}
        onChangeText={(text) => setParentesco(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>¿La persona contratada es mujer? (S/N):</Text>
      <TextInput
        value={contratadaMujer}
        onChangeText={(text) => setContratadaMujer(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>¿Cuál es tu renta familiar anual? (en euros):</Text>
      <TextInput
        value={rentaFamiliar}
        onChangeText={setRentaFamiliar}
        keyboardType="numeric"
        placeholder="Ingresa tu renta anual"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {resultado && (
        <>
          <Text style={styles.result}>{resultado}</Text>
          {cuantia && <Text style={styles.cuantia}>{cuantia}</Text>}
          {resultado.includes("Cumples con los requisitos") && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeAyudasContratacionCuidadores", {
                  discapacidad,
                  parentesco,
                  contratadaMujer,
                  rentaFamiliar,
                  resultado,
                  cuantia,
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
    color: "#006d77",
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
  cuantia: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#2a9d8f",
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
  letra: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  letras: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SimuladorAyudasContratacionCuidadores;
