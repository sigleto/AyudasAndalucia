import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import AnuncioInt from "../Anuncios/AnuncioIntersticial";

const SimuladorAyudasPartosMultiples: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [patriaPotestad, setPatriaPotestad] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [numeroHijos, setNumeroHijos] = useState<string>("");
  const [hijosMenoresTres, setHijosMenoresTres] = useState<string>("");
  const [beneficioEstimado, setBeneficioEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!residencia || !patriaPotestad || !ingresosFamiliares || !numeroHijos) {
      Alert.alert("Error", "Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (
      residencia.toUpperCase() !== "S" &&
      residencia.toUpperCase() !== "N"
    ) {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta de residencia.");
      return;
    }

    if (
      patriaPotestad.toUpperCase() !== "S" &&
      patriaPotestad.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta de patria potestad."
      );
      return;
    }

    const ingresosNum = parseFloat(ingresosFamiliares);
    const hijosNum = parseInt(numeroHijos);
    const menoresTresNum = parseInt(hijosMenoresTres) || 0;

    if (isNaN(ingresosNum) || isNaN(hijosNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toUpperCase() === "S" &&
      patriaPotestad.toUpperCase() === "S" &&
      ingresosNum <= 1.5 * 600 // Ejemplo: IPREM mensual en euros
    ) {
      let beneficioBase = 0;
      switch (hijosNum) {
        case 2:
          beneficioBase = 1200;
          break;
        case 3:
          beneficioBase = 2400;
          break;
        case 4:
          beneficioBase = 3600;
          break;
        default:
          if (hijosNum >= 5) beneficioBase = 4800;
          break;
      }

      const beneficioAdicional = menoresTresNum * 600;

      setBeneficioEstimado(
        `Cumples con los requisitos. Importe estimado: ${
          beneficioBase + beneficioAdicional
        } € (${beneficioBase} € base + ${beneficioAdicional} € por hijos menores de tres años).`
      );
    } else {
      setBeneficioEstimado(
        "No cumples con los requisitos para las ayudas por partos múltiples."
      );
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
      <Text style={styles.title}>Simulador de Ayudas por Partos Múltiples</Text>

      <Text>¿Resides y estás empadronado en Andalucía? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Tienes la patria potestad o guarda permanente de los menores? (S/N):</Text>
      <TextInput
        value={patriaPotestad}
        onChangeText={(text) => setPatriaPotestad(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>Ingresos familiares mensuales (en euros):</Text>
      <TextInput
        value={ingresosFamiliares}
        onChangeText={setIngresosFamiliares}
        placeholder="Ejemplo: 900"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número de hijos nacidos en el parto múltiple:</Text>
      <TextInput
        value={numeroHijos}
        onChangeText={setNumeroHijos}
        placeholder="Ejemplo: 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número de hijos menores de tres años al momento del nacimiento:</Text>
      <TextInput
        value={hijosMenoresTres}
        onChangeText={setHijosMenoresTres}
        placeholder="Ejemplo: 1"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {beneficioEstimado ? (
        <Text style={styles.result}>{beneficioEstimado}</Text>
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

export default SimuladorAyudasPartosMultiples;
