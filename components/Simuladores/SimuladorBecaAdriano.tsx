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

    if (
      matriculado.toUpperCase() !== "S" &&
      matriculado.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si estás matriculado."
      );
      return;
    }

    if (
      requisitosMEC.toUpperCase() !== "S" &&
      requisitosMEC.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre los requisitos académicos mínimos de la beca MEC."
      );
      return;
    }

    if (
      nivelEstudios.toUpperCase() !== "S" &&
      nivelEstudios.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si posees un título del mismo nivel o superior."
      );
      return;
    }

    if (
      modalidadAdultos.toUpperCase() !== "S" &&
      modalidadAdultos.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si cursas estudios en la modalidad de educación de adultos."
      );
      return;
    }

    const notaMediaNum = parseFloat(notaMedia);

    if (isNaN(notaMediaNum)) {
      Alert.alert("Error", "Introduce un valor numérico válido para la nota media.");
      return;
    }

    // Verificar requisitos
    if (
      matriculado.toUpperCase() === "S" &&
      notaMediaNum >= 5 &&
      requisitosMEC.toUpperCase() === "N" &&
      nivelEstudios.toUpperCase() === "N" &&
      modalidadAdultos.toUpperCase() === "N"
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
      <Text style={styles.title}>Simulador de Beca Adriano</Text>

      <Text>¿Estás matriculado en modalidad presencial? (S/N):</Text>
      <TextInput
        value={matriculado}
        onChangeText={(text) => setMatriculado(text.trim())}
        placeholder="Ejemplo: S"
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
        ¿Cumples con los requisitos académicos mínimos de la beca MEC? (S/N):
      </Text>
      <TextInput
        value={requisitosMEC}
        onChangeText={(text) => setRequisitosMEC(text.trim())}
        placeholder="Ejemplo: N"
        style={styles.input}
      />

      <Text>
        ¿Posees un título del mismo nivel o superior al solicitado? (S/N):
      </Text>
      <TextInput
        value={nivelEstudios}
        onChangeText={(text) => setNivelEstudios(text.trim())}
        placeholder="Ejemplo: N"
        style={styles.input}
      />

      <Text>¿Cursas estudios en la modalidad de educación de adultos? (S/N):</Text>
      <TextInput
        value={modalidadAdultos}
        onChangeText={(text) => setModalidadAdultos(text.trim())}
        placeholder="Ejemplo: N"
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
