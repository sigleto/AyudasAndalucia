import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorBecaAdriano: React.FC = () => {
  const [matriculado, setMatriculado] = useState<string>("");
  const [notaMedia, setNotaMedia] = useState<string>("");
  const [requisitosMEC, setRequisitosMEC] = useState<string>("");
  const [nivelEstudios, setNivelEstudios] = useState<string>("");
  const [modalidadAdultos, setModalidadAdultos] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !matriculado ||
      !notaMedia ||
      !requisitosMEC ||
      !nivelEstudios ||
      !modalidadAdultos
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const notaMediaNum = parseFloat(notaMedia);

    if (isNaN(notaMediaNum)) {
      Alert.alert("Error", "Introduce un valor numérico válido para la nota media.");
      return;
    }

    // Verificar requisitos
    if (
      matriculado.toLowerCase() === "si" &&
      notaMediaNum >= 5 &&
      requisitosMEC.toLowerCase() === "no" &&
      nivelEstudios.toLowerCase() === "no" &&
      modalidadAdultos.toLowerCase() === "no"
    ) {
      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado: 1.700 € en un único pago.`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para la Beca Adriano."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Beca Adriano</Text>

      <Text>¿Estás matriculado en modalidad presencial? (Sí/No):</Text>
      <TextInput
        value={matriculado}
        onChangeText={(text) => setMatriculado(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Nota media del último curso (ejemplo: 5.5):</Text>
      <TextInput
        value={notaMedia}
        onChangeText={setNotaMedia}
        placeholder="Ejemplo: 5.5"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>
        ¿Cumples con los requisitos académicos mínimos de la beca MEC? (Sí/No):
      </Text>
      <TextInput
        value={requisitosMEC}
        onChangeText={(text) => setRequisitosMEC(text.trim())}
        placeholder="Ejemplo: No"
        style={styles.input}
      />

      <Text>
        ¿Posees un título del mismo nivel o superior al solicitado? (Sí/No):
      </Text>
      <TextInput
        value={nivelEstudios}
        onChangeText={(text) => setNivelEstudios(text.trim())}
        placeholder="Ejemplo: No"
        style={styles.input}
      />

      <Text>¿Cursas estudios en la modalidad de educación de adultos? (Sí/No):</Text>
      <TextInput
        value={modalidadAdultos}
        onChangeText={(text) => setModalidadAdultos(text.trim())}
        placeholder="Ejemplo: No"
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

export default SimuladorBecaAdriano;
