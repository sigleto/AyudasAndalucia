import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  residencia: string;
  edad: string;
  ingresosFamiliares: string;
  miembrosHogar: string;
  patrimonio: string;
  denegacionIMV: string;
  importeEstimado: string;
};

const InformeRentaMinima: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {
    residencia,
    edad,
    ingresosFamiliares,
    miembrosHogar,
    patrimonio,
    denegacionIMV,
    importeEstimado,
  } = route.params || {};

  const generarPDF = async () => {
    try {
      const contenidoHTML = `
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2a9d8f; }
            h2, h3 { color: #444; }
            p { line-height: 1.5; }
            .highlight { font-weight: bold; color: #c13855; }
          </style>
        </head>
        <body>
          <h1>Informe de la Renta Mínima de Inserción Social</h1>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Residencia en Andalucía:</strong> ${
              residencia.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Edad del solicitante:</strong> ${edad} años</li>
            <li><strong>Ingresos familiares mensuales:</strong> ${ingresosFamiliares} €</li>
            <li><strong>Número de miembros en el hogar:</strong> ${miembrosHogar}</li>
            <li><strong>Patrimonio total:</strong> ${patrimonio} €</li>
            <li><strong>Denegación del Ingreso Mínimo Vital:</strong> ${
              denegacionIMV.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${importeEstimado}</p>
          <h3>Descripción:</h3>
          <p>La Renta Mínima de Inserción Social está destinada a personas y familias que se encuentran en situación de vulnerabilidad económica y cumplen ciertos requisitos relacionados con la residencia, ingresos, patrimonio y composición familiar.</p>
          <h3>Pasos para acceder a la ayuda:</h3>
          <ol>
            <li>Reúne los documentos necesarios (certificado de empadronamiento, comprobante de ingresos, declaración de patrimonio, etc.).</li>
            <li>Consulta con las oficinas de servicios sociales o administración pública correspondiente.</li>
            <li>Completa el formulario de solicitud según las indicaciones proporcionadas.</li>
            <li>Entrega los documentos requeridos y espera la resolución.</li>
          </ol>
          <p><em>Nota:</em> Este informe es meramente informativo y no garantiza la concesión de la ayuda.</p>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: contenidoHTML });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(
          "No se puede compartir",
          "El dispositivo no admite compartir archivos."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al generar el informe.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe de la Renta Mínima</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Residencia en Andalucía:</Text>
        <Text style={styles.value}>
          {residencia.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Edad del solicitante:</Text>
        <Text style={styles.value}>{edad} años</Text>

        <Text style={styles.label}>Ingresos familiares mensuales:</Text>
        <Text style={styles.value}>{ingresosFamiliares} €</Text>

        <Text style={styles.label}>Número de miembros en el hogar:</Text>
        <Text style={styles.value}>{miembrosHogar}</Text>

        <Text style={styles.label}>Patrimonio total:</Text>
        <Text style={styles.value}>{patrimonio} €</Text>

        <Text style={styles.label}>
          Denegación del Ingreso Mínimo Vital:
        </Text>
        <Text style={styles.value}>
          {denegacionIMV.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Resultado de la simulación:</Text>
        <Text style={[styles.value, styles.resultado]}>{importeEstimado}</Text>
      </View>

      {/* Botón para generar el PDF */}
      <TouchableOpacity onPress={generarPDF} style={styles.boton}>
        <Text style={styles.botonTexto}>Descargar Informe en PDF</Text>
      </TouchableOpacity>

      {/* Botón para regresar a la pantalla principal */}
      <TouchableOpacity
        onPress={() => Alert.alert("Volver", "Regresando a inicio...")}
        style={[styles.boton, styles.botonSecundario]}
      >
        <Text style={styles.botonTexto}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a9d8f",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  resultado: {
    fontWeight: "bold",
    color: "#c13855",
    textAlign: "center",
    marginTop: 10,
  },
  boton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  botonSecundario: {
    backgroundColor: "#c13855",
    marginTop: 10,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformeRentaMinima;
