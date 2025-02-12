import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorSolidaridadAlimentaria: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [empadronamiento, setEmpadronamiento] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [miembrosHogar, setMiembrosHogar] = useState<string>("");
  const [menoresEscolarizados, setMenoresEscolarizados] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !residencia ||
      !empadronamiento ||
      !ingresosFamiliares ||
      !miembrosHogar ||
      !menoresEscolarizados
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const ingresosNum = parseFloat(ingresosFamiliares);
    const miembrosNum = parseInt(miembrosHogar);
    const menoresNum = parseInt(menoresEscolarizados);

    if (isNaN(ingresosNum) || isNaN(miembrosNum) || isNaN(menoresNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toLowerCase() === "si" &&
      empadronamiento.toLowerCase() === "si" &&
      ingresosNum <= miembrosNum * 600 && // Ejemplo: IPREM mensual multiplicado por número de miembros
      menoresNum <= miembrosNum
    ) {
      // Calcular importe estimado basado en el número de miembros del hogar y menores escolarizados
      const basePorMiembro = 100; // Ejemplo: importe base por miembro del hogar
      const extraPorMenorEscolarizado = 50; // Ejemplo: importe adicional por menor escolarizado

      const importeTotal =
        miembrosNum * basePorMiembro + menoresNum * extraPorMenorEscolarizado;

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado de la ayuda: ${importeTotal} €.`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para el Programa de Solidaridad y Garantía Alimentaria."
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
      <Text style={styles.title}>
        Simulador del Programa de Solidaridad y Garantía Alimentaria
      </Text>

      <Text>¿Resides en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Estás empadronado en un municipio andaluz? (Sí/No):</Text>
      <TextInput
        value={empadronamiento}
        onChangeText={(text) => setEmpadronamiento(text.trim())}
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

      <Text>Número de miembros en la unidad familiar:</Text>
      <TextInput
        value={miembrosHogar}
        onChangeText={setMiembrosHogar}
        placeholder="Ejemplo: 4"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número de menores escolarizados en centros públicos:</Text>
      <TextInput
        value={menoresEscolarizados}
        onChangeText={setMenoresEscolarizados}
        placeholder="Ejemplo: 2"
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

export default SimuladorSolidaridadAlimentaria;
