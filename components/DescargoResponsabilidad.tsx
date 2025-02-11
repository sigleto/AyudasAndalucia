import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Definir el tipo para las rutas de navegación
type RootDrawerParamList = {
  Home: undefined;
  ListadoAyudas: undefined;
  Principal: undefined;
};

type DescargoScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Principal'>;

const DescargoResponsabilidad: React.FC = () => {
  const navigation = useNavigation<DescargoScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.titulo}>Aviso de Descargo de Responsabilidad:</Text>
        <Text style={styles.parrafo}>
          {"Esta aplicación tiene como objetivo facilitar el acceso a información sobre ayudas públicas disponibles en diversas áreas, como vivienda, discapacidad, desempleo, estudios, emprendimiento y más. Queremos aclarar que no somos una entidad pública ni estamos afiliados a ninguna institución gubernamental o privada. Somos un servicio independiente que organiza y presenta información obtenida de fuentes públicas.\n\n" +
          "La información proporcionada en esta aplicación se basa en datos disponibles públicamente y puede estar sujeta a cambios o actualizaciones. No asumimos responsabilidad por errores, omisiones o modificaciones realizadas por las instituciones que gestionan dichas ayudas.\n\n" +
          "Por favor, tenga en cuenta que esta aplicación no representa ni pretende representar a ninguna entidad pública o privada. Recomendamos verificar directamente con las entidades correspondientes para confirmar la autenticidad y vigencia de la información proporcionada.\n\n" +
          "Gracias por utilizar nuestra aplicación."}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Principal' as never)}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
    color: '#007BFF',
  },
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  skipButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DescargoResponsabilidad;
