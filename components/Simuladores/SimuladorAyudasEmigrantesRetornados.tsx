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
  InformeAyudasEmigrantesRetornados: {
    residencia: string;
    empadronamiento: string;
    desempleo: string;
    renta: string;
    resultado: string;
    cuantia: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorAyudasEmigrantesRetornados: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [empadronamiento, setEmpadronamiento] = useState<string>("");
  const [desempleo, setDesempleo] = useState<string>("");
  const [renta, setRenta] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const [cuantia, setCuantia] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    const rentaNum = parseFloat(renta);

    if (
      (residencia !== "S" && residencia !== "N") ||
      (empadronamiento !== "S" && empadronamiento !== "N") ||
      (desempleo !== "S" && desempleo !== "N") ||
      isNaN(rentaNum)
    ) {
      setResultado("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (
      residencia === "S" &&
      empadronamiento === "S" &&
      desempleo === "S" &&
      rentaNum <= 1200 // Límite de renta establecido como ejemplo
    ) {
      setResultado("Cumples con los requisitos para recibir la ayuda.");
      setCuantia("426€ mensuales durante un máximo de 6 meses.");
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
      <Text style={styles.title}>Simulador Ayudas Emigrantes Retornados</Text>

      <Text>¿Has residido en el extranjero al menos 12 meses? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>¿Estás empadronado en Andalucía? (S/N):</Text>
      <TextInput
        value={empadronamiento}
        onChangeText={(text) => setEmpadronamiento(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>¿Estás en situación de desempleo? (S/N):</Text>
      <TextInput
        value={desempleo}
        onChangeText={(text) => setDesempleo(text.toUpperCase().trim())}
        maxLength={1}
        placeholder="Ingresa S o N"
        style={styles.input}
      />

      <Text>¿Cuál es tu renta mensual? (en euros):</Text>
      <TextInput
        value={renta}
        onChangeText={setRenta}
        keyboardType="numeric"
        placeholder="Ingresa tu renta"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {resultado && (
        <>
          <Text style={styles.result}>{resultado}</Text>
          {cuantia && (
            <Text style={styles.cuantia}>{`Cuantía estimada: ${cuantia}`}</Text>
          )}
          {resultado.includes("Cumples con los requisitos") && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeAyudasEmigrantesRetornados", {
                  residencia,
                  empadronamiento,
                  desempleo,
                  renta,
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

export default SimuladorAyudasEmigrantesRetornados;
