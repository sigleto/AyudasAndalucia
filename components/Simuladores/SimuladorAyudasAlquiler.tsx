import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorAyudasAlquiler: React.FC = () => {
  const [rentaMensual, setRentaMensual] = useState<string>("");
  const [mayor65, setMayor65] = useState<string>("");
  const [vulnerabilidad, setVulnerabilidad] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!rentaMensual || !mayor65 || !vulnerabilidad || !ingresosFamiliares) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const rentaNum = parseFloat(rentaMensual);
    const ingresosNum = parseFloat(ingresosFamiliares);

    if (isNaN(rentaNum) || isNaN(ingresosNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (rentaNum > 900) {
      setImporteEstimado(
        "No cumples con los requisitos. La renta mensual no debe superar los 900 €."
      );
      return;
    }

    let porcentajeCobertura = 40; // Cobertura base del alquiler

    if (mayor65.toLowerCase() === "si") {
      porcentajeCobertura = 50; // Cobertura para mayores de 65 años
    }

    if (vulnerabilidad.toLowerCase() === "si") {
      porcentajeCobertura = 75; // Cobertura para situaciones de especial vulnerabilidad
    }

    const importeAyuda = (rentaNum * porcentajeCobertura) / 100;

    setImporteEstimado(
      `Cumples con los requisitos. Importe estimado de la ayuda: ${importeAyuda.toFixed(
        2
      )} € (${porcentajeCobertura}% de la renta mensual).`
    );
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
      <Text style={styles.title}>Simulador de Ayudas al Alquiler</Text>

      <Text>Renta mensual de tu vivienda (en euros):</Text>
      <TextInput
        value={rentaMensual}
        onChangeText={setRentaMensual}
        placeholder="Ejemplo: 600"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Eres mayor de 65 años? (Sí/No):</Text>
      <TextInput
        value={mayor65}
        onChangeText={(text) => setMayor65(text.trim())}
        placeholder="Ejemplo: No"
        style={styles.input}
      />

      <Text>
        ¿Te encuentras en una situación de especial vulnerabilidad? (Sí/No):
      </Text>
      <TextInput
        value={vulnerabilidad}
        onChangeText={(text) => setVulnerabilidad(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Ingresos familiares mensuales (en euros):</Text>
      <TextInput
        value={ingresosFamiliares}
        onChangeText={setIngresosFamiliares}
        placeholder="Ejemplo: 1200"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {importeEstimado ? (
        <Text style={styles.result}>{importeEstimado}</Text>
      ) : null}
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
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4caf50",
  },
});

export default SimuladorAyudasAlquiler;
