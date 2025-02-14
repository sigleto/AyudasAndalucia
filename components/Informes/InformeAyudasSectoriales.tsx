import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";
import AnuncioRecompensado from "../Anuncios/AnuncioRecompensado";

type RouteParams = {
  sector: string;
  sostenibilidad: string;
  tamañoExplotacion: string;
  resultado: string;
};

const InformeAyudasSectoriales: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { sector, sostenibilidad, tamañoExplotacion, resultado } =
    route.params || {};

  const [recompensaGanada, setRecompensaGanada] = useState(false);
  const [botonActivo, setBotonActivo] = useState(false);

  const manejarRecompensa = (reward: { type: string; amount: number }) => {
    console.log(`Recompensa obtenida: ${reward.type}, cantidad: ${reward.amount}`);
    setRecompensaGanada(true);
  };

  // Habilitar el botón del PDF cuando se gane la recompensa
  useEffect(() => {
    if (recompensaGanada) {
      setBotonActivo(true);
    }
  }, [recompensaGanada]);

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
          <h1>Informe de Simulación</h1>
          <h2>Ayudas Sectoriales</h2>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Sector agrícola:</strong> ${sector}</li>
            <li><strong>Cumple criterios de sostenibilidad:</strong> ${
              sostenibilidad === "S" ? "Sí" : "No"
            }</li>
            <li><strong>Tamaño de la explotación:</strong> ${
              tamañoExplotacion === "P"
                ? "Pequeña"
                : tamañoExplotacion === "M"
                ? "Mediana"
                : "Grande"
            }</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${resultado}</p>
          <h3>Descripción:</h3>
          <p>Las ayudas sectoriales están destinadas a fomentar la sostenibilidad y el desarrollo en sectores agrícolas específicos como el olivar o las explotaciones hortofrutícolas. Estas ayudas buscan apoyar a explotaciones pequeñas y sostenibles.</p>
          <h3>Pasos para realizar la solicitud:</h3>
          <ol>
            <li>Reúne los documentos necesarios (certificación del sector, cumplimiento de sostenibilidad, datos de la explotación, etc.).</li>
            <li>Consulta con las oficinas agrarias o administración pública correspondiente.</li>
            <li>Completa el formulario de solicitud según las indicaciones proporcionadas.</li>
            <li>Entrega los documentos requeridos y espera la resolución.</li>
          </ol>
          <p><em>Nota:</em> Este informe es meramente informativo y no sustituye la consulta oficial con los organismos competentes.</p>
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
      <Text style={styles.title}>Informe del Simulador</Text>

      {/* Mostrar los datos del informe */}
      <View style={styles.section}>
        <Text style={styles.label}>Sector agrícola:</Text>
        <Text style={styles.value}>{sector}</Text>

        <Text style={styles.label}>Cumple criterios de sostenibilidad:</Text>
        <Text style={styles.value}>{sostenibilidad === "S" ? "Sí" : "No"}</Text>

        <Text style={styles.label}>Tamaño de la explotación:</Text>
        <Text style={styles.value}>
          {tamañoExplotacion === "P"
            ? "Pequeña"
            : tamañoExplotacion === "M"
            ? "Mediana"
            : "Grande"}
        </Text>

        <Text style={styles.label}>Resultado:</Text>
        <Text style={[styles.value, styles.resultado]}>{resultado}</Text>
      </View>

      {/* Mostrar anuncio si no se ha ganado recompensa */}
      {!recompensaGanada && (
        <AnuncioRecompensado onRewardEarned={manejarRecompensa} />
      )}

      {/* Mostrar botón para generar PDF si ya se ganó recompensa */}
      {botonActivo && (
        <TouchableOpacity onPress={generarPDF} style={styles.boton}>
          <Text style={styles.botonTexto}>Descargar Informe en PDF</Text>
        </TouchableOpacity>
      )}

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
    backgroundColor: "#c13855",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  botonSecundario: {
    backgroundColor: "#007BFF",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformeAyudasSectoriales;
