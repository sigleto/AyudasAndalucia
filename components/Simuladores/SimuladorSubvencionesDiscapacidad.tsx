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
import { Picker } from "@react-native-picker/picker"; // Importar Picker desde el paquete correcto
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AnuncioInt from "../Anuncios/AnuncioIntersticial";

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

    if (residencia.toUpperCase() !== "S" && residencia.toUpperCase() !== "N") {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta sobre residencia.");
      return;
    }

    const discapacidadNum = parseFloat(discapacidad);
    const rentaNum = parseFloat(renta);

    if (isNaN(discapacidadNum) || isNaN(rentaNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    if (discapacidadNum >= 33 && residencia.toUpperCase() === "S" && rentaNum <= 1.25) {
      let importe = 0;
      switch (concepto) {
        case "Adaptación de vehículos":
          importe = 750;
          break;
        case "Prótesis auditivas":
          importe = 1200;
          break;
        case "Prótesis dentales":
          importe = 600;
          break;
        case "Productos de apoyo":
          importe = 6000;
          break;
        case "Gastos de desplazamiento":
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
      <AnuncioInt />
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

      <Text>Concepto de la ayuda:</Text>
      <Picker
        selectedValue={concepto}
        onValueChange={(itemValue) => setConcepto(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un concepto" value="" />
        <Picker.Item label="Adaptación de vehículos" value="Adaptación de vehículos" />
        <Picker.Item label="Prótesis auditivas" value="Prótesis auditivas" />
        <Picker.Item label="Prótesis dentales" value="Prótesis dentales" />
        <Picker.Item label="Productos de apoyo" value="Productos de apoyo" />
        <Picker.Item label="Gastos de desplazamiento" value="Gastos de desplazamiento" />
      </Picker>

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
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  boton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  botonTexto: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default SimuladorSubvencionesDiscapacidad;