import React, { useState, useEffect } from "react";
import { categories } from "./RequisitosGeneral";
import {
  Share,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FormularioGeneral: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [selectedAyuda, setSelectedAyuda] = useState<number | undefined>(
    undefined
  );
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (selectedCategory !== undefined && selectedAyuda !== undefined) {
      const ayuda = categories[selectedCategory].ayudas[selectedAyuda];

      console.log(ayuda.simulador);
      navigation.dispatch(
        CommonActions.navigate({
          name: ayuda.simulador[0],
          params: {}, // Puedes agregar parámetros aquí si es necesario
        })
      );
    } else {
      Alert.alert(
        "Error",
        "Por favor, selecciona una categoría y una ayuda antes de continuar."
      );
    }
  };
const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Descarga la app Ayudas Públicas Andalucía y descubre todas las ayudas disponibles. ¡Haz clic aquí para descargarla! https://play.google.com/store/apps/details?id=com.sigleto.AyudasAndalucia",
      });
    } catch (error) {
      console.error("Error al compartir", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Solicitud de Ayudas</Text>
 <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={27}
          color="#007BFF"
        />
         </TouchableOpacity>
      <Text style={styles.label}>Categoría:</Text>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(value: number) => {
          setSelectedCategory(value);
          setSelectedAyuda(undefined);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona categoría" value={undefined} />
        {categories.map((cat, index) => (
          <Picker.Item key={index} label={cat.category} value={index} />
        ))}
      </Picker>

      {selectedCategory !== undefined && (
        <>
          <Text style={styles.label}>Ayuda:</Text>
          <Picker
            selectedValue={selectedAyuda}
            onValueChange={(value: number | undefined) =>
              setSelectedAyuda(value)
            }
            style={styles.picker}
          >
            <Picker.Item label="Selecciona ayuda" value={undefined} />
            {categories[selectedCategory].ayudas.map((ayuda, index) => (
              <Picker.Item key={index} label={ayuda.name} value={index} />
            ))}
          </Picker>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f7", // Fondo más suave para el formulario
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#c8851e", // Color destacado para el título
    textAlign: "center", // Centrado del título
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: "#333", // Color oscuro para las etiquetas
  },
  picker: {
    backgroundColor: "#fff", // Fondo blanco para los pickers
    height: 50,
    borderRadius: 10,
    borderColor: "#c8851e", // Borde con color suave
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#c13855",
    borderRadius: 30, // Bordes más redondeados
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "50%",
    marginTop: 30,
    height: 50,
    marginBlock: 80,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  shareIcon: {
    position: "absolute",
    right: 20,
    top: 10,
    fontSize: 20,
    backgroundColor:"#c3fe4d"
  },
});

export default FormularioGeneral;
