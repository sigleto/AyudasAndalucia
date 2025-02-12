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

type RootStackParamList = {
  Home: undefined;
  InformeSubvencionesDiscapacidad: {
    discapacidad: string;
    residencia: string;
    renta: string;
    concepto: string;
    importeEstimado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorSubvencionesDiscapacidad: React.FC = () => {
  const [discapacidad, setDiscapacidad] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [renta, setRenta] = useState<string>("");
  const [concepto, setConcepto] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");
  const [cumpleRequisitos, setCumpleRequisitos] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    if (!discapacidad || !residencia || !renta || !concepto) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
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
      residencia.toLowerCase() === "si" &&
      rentaNum <= 1.25
    ) {
      let importe = 0;
      switch (concepto.toLowerCase()) {
        case "adaptación de vehículos":
          importe = 750;
          break;
        case "prótesis auditivas":
          importe = 1200;
          break;
        case "prótesis dentales":
          importe = 600;
          break;
        case "productos de apoyo":
          importe = 6000;
          break;
        case "gastos de desplazamiento":
          importe = 109 * 12; // Mensual multiplicado por un año
          break;
        default:
          Alert.alert("Error", "Selecciona un concepto válido.");
          return;
      }

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado: ${importe}€ para el concepto "${concepto}".`
      );
      setCumpleRequisitos(true);
    } else {
      setImporteEstimado("No cumples con los requisitos para esta subvención.");
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
      <Text style={styles.title}>
        Simulador de Subvenciones Individuales por Discapacidad
      </Text>

      <Text>Porcentaje de discapacidad (%):</Text>
      <TextInput
        value={discapacidad}
        onChangeText={setDiscapacidad}
        placeholder="Ejemplo: 45"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Resides en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
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

      <Text>
        Concepto de la ayuda (Adaptación de vehículos, Prótesis auditivas,
        Prótesis dentales, Productos de apoyo, Gastos de desplazamiento):
      </Text>
      <TextInput
        value={concepto}
        onChangeText={(text) => setConcepto(text.trim())}
        placeholder="Ejemplo: Prótesis auditivas"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {importeEstimado ? (
        <>
          <Text style={styles.result}>{importeEstimado}</Text>

          {cumpleRequisitos && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeSubvencionesDiscapacidad", {
                  discapacidad,
                  residencia,
                  renta,
                  concepto,
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

export default SimuladorSubvencionesDiscapacidad;
