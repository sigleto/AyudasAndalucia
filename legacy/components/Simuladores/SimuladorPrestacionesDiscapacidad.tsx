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
  InformePrestacionesDiscapacidad: {
    discapacidad: string;
    residencia: string;
    renta: string;
    importeEstimado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorPrestacionesDiscapacidad: React.FC = () => {
  const [discapacidad, setDiscapacidad] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [renta, setRenta] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");
  const [cumpleRequisitos, setCumpleRequisitos] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    if (!discapacidad || !residencia || !renta) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (
      residencia.toUpperCase() !== "S" &&
      residencia.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre residencia."
      );
      return;
    }

    const discapacidadNum = parseFloat(discapacidad);
    const rentaNum = parseFloat(renta);

    if (isNaN(discapacidadNum) || isNaN(rentaNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    if (
      discapacidadNum >= 33 &&
      residencia.toUpperCase() === "S" &&
      rentaNum <= 1.25
    ) {
      let importe = 0;
      if (discapacidadNum >= 65) {
        importe += 1200; // Prótesis auditivas
      }
      if (rentaNum <= 1) {
        importe += 600; // Prótesis dentales
      }
      importe += rentaNum > 1 ? 750 : 6000; // Productos tecnológicos o vehículos

      setImporteEstimado(`Cumples los requisitos. Importe estimado: ${importe}€.`);
      setCumpleRequisitos(true);
    } else {
      setImporteEstimado("No cumples con los requisitos para esta ayuda.");
      setCumpleRequisitos(false);
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
      <Text style={styles.title}>Simulador de Prestaciones por Discapacidad</Text>

      <Text>Porcentaje de discapacidad (%):</Text>
      <TextInput
        value={discapacidad}
        onChangeText={setDiscapacidad}
        placeholder="Ejemplo: 45"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Resides en Andalucía? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>Renta per cápita familiar (en relación al IPREM, ej. 1.2):</Text>
      <TextInput
        value={renta}
        onChangeText={setRenta}
        placeholder="Ejemplo: 1.2"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {importeEstimado ? (
        <>
          <Text style={styles.result}>{importeEstimado}</Text>

          {cumpleRequisitos && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformePrestacionesDiscapacidad", {
                  discapacidad,
                  residencia,
                  renta,
                  importeEstimado,
                })
              }
              style={styles.boton}
            >
              <Text style={styles.botonTexto}>Generar Informe PDF</Text>
            </TouchableOpacity>
          )}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a9d8f",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SimuladorPrestacionesDiscapacidad;
