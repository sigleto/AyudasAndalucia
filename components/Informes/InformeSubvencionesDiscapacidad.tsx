import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  discapacidad: string;
  residencia: string;
  renta: string;
  concepto: string;
  importeEstimado: string;
};

const InformeSubvencionesDiscapacidad: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { discapacidad, residencia, renta, concepto, importeEstimado } =
    route.params || {};

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
          <h1>Informe de Subvenciones Individuales por Discapacidad</h1>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Porcentaje de discapacidad:</strong> ${discapacidad}%</li>
            <li><strong>Reside en Andalucía:</strong> ${
              residencia.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Renta per cápita familiar:</strong> ${renta}</li>
            <li><strong>Concepto de la ayuda:</strong> ${concepto}</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${importeEstimado}</p>
          <h3>Descripción:</h3>
          <p>Este informe detalla las subvenciones disponibles para personas con discapacidad que cumplen ciertos requisitos relacionados con el porcentaje de discapacidad, la residencia y la renta familiar.</p>
          <h3>Pasos para acceder a las subvenciones:</h3>
          <ol>
            <li>Reúne los documentos necesarios (certificado de discapacidad, comprobante de residencia, declaración de renta, etc.).</li>
            <li>Consulta con las oficinas de servicios sociales o administración pública correspondiente.</li>
            <li>Completa el formulario de solicitud según las indicaciones proporcionadas.</li>
            <li>Entrega los documentos requeridos y espera la resolución.</li>
          </ol>
          <p><em>Nota:</em> Este informe es meramente informativo y no garantiza la concesión de la subvención.</p>
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
      <Text style={styles.title}>
        Informe de Subvenciones Individuales por Discapacidad
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Porcentaje de discapacidad:</Text>
        <Text style={styles.value}>{discapacidad}%</Text>

        <Text style={styles.label}>Reside en Andalucía:</Text>
        <Text style={styles.value}>
          {residencia.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Renta per cápita familiar:</Text>
        <Text style={styles.value}>{renta}</Text>

        <Text style={styles.label}>Concepto de la ayuda:</Text>
        <Text style={styles.value}>{concepto}</Text>

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

export default InformeSubvencionesDiscapacidad;
