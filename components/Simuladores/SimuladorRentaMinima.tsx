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
  InformeRentaMinima: {
    residencia: string;
    edad: string;
    ingresosFamiliares: string;
    miembrosHogar: string;
    patrimonio: string;
    denegacionIMV: string;
    importeEstimado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorRentaMinima: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [miembrosHogar, setMiembrosHogar] = useState<string>("");
  const [patrimonio, setPatrimonio] = useState<string>("");
  const [denegacionIMV, setDenegacionIMV] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");
  const [cumpleRequisitos, setCumpleRequisitos] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    if (
      !residencia ||
      !edad ||
      !ingresosFamiliares ||
      !miembrosHogar ||
      !patrimonio ||
      !denegacionIMV
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (
      residencia.toUpperCase() !== "S" &&
      residencia.toUpperCase() !== "N"
    ) {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta sobre residencia.");
      return;
    }

    if (
      denegacionIMV.toUpperCase() !== "S" &&
      denegacionIMV.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre la denegación del IMV."
      );
      return;
    }

    const edadNum = parseInt(edad);
    const ingresosNum = parseFloat(ingresosFamiliares);
    const miembrosNum = parseInt(miembrosHogar);
    const patrimonioNum = parseFloat(patrimonio);

    if (
      isNaN(edadNum) ||
      isNaN(ingresosNum) ||
      isNaN(miembrosNum) ||
      isNaN(patrimonioNum)
    ) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    if (
      residencia.toUpperCase() === "S" &&
      edadNum >= 25 &&
      edadNum <= 64 &&
      ingresosNum < 604.22 + (miembrosNum - 1) * (604.22 * 0.3) &&
      patrimonioNum <= 6000 &&
      denegacionIMV.toUpperCase() === "S"
    ) {
      const baseCuantia = 604.22;
      const incrementoPorMiembro = baseCuantia * 0.3;

      const importeTotal =
        baseCuantia + (miembrosNum - 1) * incrementoPorMiembro;

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado de la ayuda: ${importeTotal.toFixed(
          2
        )} € mensuales.`
      );
      setCumpleRequisitos(true);
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para la Renta Mínima de Inserción Social."
      );
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
      <Text style={styles.title}>
        Simulador de la Renta Mínima de Inserción Social
      </Text>

      <Text>¿Resides en Andalucía y estás empadronado? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>Edad del solicitante:</Text>
      <TextInput
        value={edad}
        onChangeText={setEdad}
        placeholder="Ejemplo: 35"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Ingresos familiares mensuales (en euros):</Text>
      <TextInput
        value={ingresosFamiliares}
        onChangeText={setIngresosFamiliares}
        placeholder="Ejemplo: 500"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número de miembros en la unidad familiar:</Text>
      <TextInput
        value={miembrosHogar}
        onChangeText={setMiembrosHogar}
        placeholder="Ejemplo: 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Patrimonio total (en euros):</Text>
      <TextInput
        value={patrimonio}
        onChangeText={setPatrimonio}
        placeholder="Ejemplo: 3000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>
        ¿Has recibido una denegación del Ingreso Mínimo Vital? (S/N):
      </Text>
      <TextInput
        value={denegacionIMV}
        onChangeText={(text) => setDenegacionIMV(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {importeEstimado ? (
        <>
          <Text style={styles.result}>{importeEstimado}</Text>

          {cumpleRequisitos && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeRentaMinima", {
                  residencia,
                  edad,
                  ingresosFamiliares,
                  miembrosHogar,
                  patrimonio,
                  denegacionIMV,
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

export default SimuladorRentaMinima;
