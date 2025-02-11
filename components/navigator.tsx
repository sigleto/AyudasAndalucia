import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";

import Home from "./Home";
import DescargoResponsabilidad from "./DescargoResponsabilidad";
import PoliticaPrivacidad from "./PoliticaPrivacidad";
import FormularioGeneral from "./SimuladorGeneral/FormularioGeneral";
import Presentacion1 from "./Presentacion/Presentacion1";

//Listado de ayudas
import ListadoDeAyudas from "./ListadoAyudas";
import AyudasAgricolas from "./Listado/AyudasAgricolas";
import AyudasSociales from "./Listado/AyudasSociales";
import AyudasVivienda from "./Listado/AyudasVivienda";
import BecasEstudio from "./Listado/BecasEstudio";
import Discapacidad from "./Listado/Discapacidad";
import Emprendedores from "./Listado/Emprendedores";
import AyudaDescendientes from "./Listado/PrestacionesDescendientes";
import SubsidiosDesempleo from "./Listado/SubsidiosDesempleo";

//desglose de ayudas
import AyudasAgricultoresJovenes from "./desgloseAyudas/Agrícolas/AyudasAgricultoresJovenes";
import AyudasModernizacionMaquinaria from "./desgloseAyudas/Agrícolas/AyudasModernizacionMaquinaria";
import AyudasSectorialesAgricolas from "./desgloseAyudas/Agrícolas/MedidasSectoriales";
import BecasSegundaOportunidad from "./desgloseAyudas/Desempleo/BecaSegundaOportunidad";
import AyudasEmigrantesRetornados from "./desgloseAyudas/Desempleo/EmigrantesRetornadas";
import AyudasTrabajadoresAgrarios from "./desgloseAyudas/Desempleo/TrabajadoresAgrarios";
import AyudasVictimasViolenciaGenero from "./desgloseAyudas/Desempleo/VictimasViolenciaGenero";
import AyudasContratacionCuidadores from "./desgloseAyudas/Discapacidad/AyudasContratacionPersonasCuidadoras";
import PrestacionesDiscapacidad from "./desgloseAyudas/Discapacidad/PrestacionesSocialesDiscapacidad";
import SubvencionesIndividuales from "./desgloseAyudas/Discapacidad/SubvencionesIndividuales";
import Beca6000 from "./desgloseAyudas/Educación/Beca6000";
import BecaAdriano from "./desgloseAyudas/Educación/BecaAdriano";
import ProgramaAndaluciaEmprende from "./desgloseAyudas/Emprendedores/ProgramaAndaluciaEmprende";
import ProgramaCuotaCero from "./desgloseAyudas/Emprendedores/ProgramaCuotaCero";
import ProgramaEmpleaT from "./desgloseAyudas/Emprendedores/ProgramaEmpleaT";
import SubvencionesAutonomos from "./desgloseAyudas/Emprendedores/SubvencionesTrabajoAutonomo";
import AyudasPartosMultiples from "./desgloseAyudas/PrestacionesFamiliares/AyudaPartosMultiples";
import AyudasGuarderia from "./desgloseAyudas/PrestacionesFamiliares/AyudasGuarderia";
import BonoCarestia from "./desgloseAyudas/PrestacionesFamiliares/BonoCarestia";
import AyudasEmergenciaSocial from "./desgloseAyudas/Sociales/AyudasEmergenciaSocial";
import SolidaridadAlimentaria from "./desgloseAyudas/Sociales/ProgramaSolidaridadAlimentaria";
import RentaMinimaInsercion from "./desgloseAyudas/Sociales/RentaMinimaReinsercion";
import AyudasAlquiler from "./desgloseAyudas/Vivienda/AyudasAlAlquilerPersonasVulnerables";
import GarantiaViviendaJoven from "./desgloseAyudas/Vivienda/ProgramaGarantiaViviendaJoven";
import RehabilitacionVivienda from "./desgloseAyudas/Vivienda/ProgramasRehabilitacionVIvienda";

//simuladores
import SimuladorAyudasAgricultores from "./Simuladores/SimuladorAyudasAgricultores";
import SimuladorAyudasSectoriales from "./Simuladores/SimuladorAyudasSectoriales";
import SimuladorBecasSegundaOportunidad from "./Simuladores/SimuladorBecasSegundaOportunidad";
import SimuladorAyudasEmigrantesRetornados from "./Simuladores/SimuladorAyudasEmigrantesRetornados";
import SimuladorAyudasTrabajadoresAgrarios from "./Simuladores/SimuladorAyudasTrabajadoresAgrarios";
import SimuladorAyudasContratacionCuidadores from "./Simuladores/SimuladorAyudasContratacionCuidadores";

enableScreens();

const Stack = createStackNavigator();

export function AyudasStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="DescargoResponsabilidad" component={DescargoResponsabilidad} options={{ headerShown: false }} />
    <Stack.Screen name="PoliticaPrivacidad" component={PoliticaPrivacidad} options={{ headerShown: false }} />
    <Stack.Screen name="ListadoAyudas" component={ListadoDeAyudas} options={{ headerShown: false }} />
    <Stack.Screen name="SubsidiosDesempleo" component={SubsidiosDesempleo} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasVivienda" component={AyudasVivienda} options={{ headerShown: false }} />
    <Stack.Screen name="AyudaDescendientes" component={AyudaDescendientes} options={{ headerShown: false }} />
    <Stack.Screen name="BecasEstudio" component={BecasEstudio} options={{ headerShown: false }} />
    <Stack.Screen name="Emprendedores" component={Emprendedores} options={{ headerShown: false }} />
    <Stack.Screen name="Discapacidad" component={Discapacidad} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasSociales" component={AyudasSociales} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasAgricolas" component={AyudasAgricolas} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasAgricultoresJovenes" component={AyudasAgricultoresJovenes} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasModernizacionMaquinaria" component={AyudasModernizacionMaquinaria} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasMejoraRendimiento" component={AyudasSectorialesAgricolas} options={{ headerShown: false }} />
    <Stack.Screen name="BecasSegundaOportunidad" component={BecasSegundaOportunidad} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasEmigrantesRetornados" component={AyudasEmigrantesRetornados} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasTrabajadoresAgrarios" component={AyudasTrabajadoresAgrarios} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasVictimasViolenciaGenero" component={AyudasVictimasViolenciaGenero} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasContratacionPersonasCuidadoras" component={AyudasContratacionCuidadores} options={{ headerShown: false }} />
    <Stack.Screen name="PrestacionesSocialesPersonasDiscapacidad" component={PrestacionesDiscapacidad} options={{ headerShown: false }} />
    <Stack.Screen name="SubvencionesIndividuales" component={SubvencionesIndividuales} options={{ headerShown: false }} />
    <Stack.Screen name="Beca6000" component={Beca6000} options={{ headerShown: false }} />
    <Stack.Screen name="BecaAdriano" component={BecaAdriano} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramaAndaluciaEmprende" component={ProgramaAndaluciaEmprende} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramaCuotaCero" component={ProgramaCuotaCero} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramaEmpleaT" component={ProgramaEmpleaT} options={{ headerShown: false }} />
    <Stack.Screen name="SubvencionesTrabajoAutonomo" component={SubvencionesAutonomos} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasPartosMultiples" component={AyudasPartosMultiples} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasGuarderias" component={AyudasGuarderia} options={{ headerShown: false }} />
    <Stack.Screen name="BonoCarestia" component={BonoCarestia} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasEmergenciaSocial" component={AyudasEmergenciaSocial} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramaSolidaridadAlimentaria" component={SolidaridadAlimentaria} options={{ headerShown: false }} />
    <Stack.Screen name="RentaMinimaReinsercion" component={RentaMinimaInsercion} options={{ headerShown: false }} />
    <Stack.Screen name="AyudasAlAlquilerPersonasVulnerables" component={AyudasAlquiler} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramaGarantiaViviendaJoven" component={GarantiaViviendaJoven} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramasRehabilitacionVivienda" component={RehabilitacionVivienda} options={{ headerShown: false }} />
    <Stack.Screen name="SimuladorAyudasAgricultores" component={SimuladorAyudasAgricultores} options={{ headerShown: false }} />
    <Stack.Screen name="SimuladorAyudasSectoriales" component={SimuladorAyudasSectoriales} options={{ headerShown: false }} />
    <Stack.Screen name="SimuladorBecasSegundaOportunidad" component={SimuladorBecasSegundaOportunidad} options={{ headerShown: false }} />
    <Stack.Screen name="SimuladorAyudasEmigrantesRetornados" component={SimuladorAyudasEmigrantesRetornados} options={{ headerShown: false }} />
    <Stack.Screen name="SimuladorAyudasTrabajadoresAgrarios" component={SimuladorAyudasTrabajadoresAgrarios} options={{ headerShown: false }} />
    <Stack.Screen name="SimuladorAyudasContratacionCuidadores" component={SimuladorAyudasContratacionCuidadores} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
}

export function FormularioGeneralStack() {
  return (
    <Stack.Navigator
      initialRouteName="FormularioGeneral"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="FormularioGeneral"
        component={FormularioGeneral}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function PresentacionStack() {
  return (
    <Stack.Navigator
      initialRouteName="Presentacion1"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: { animation: "timing", config: { duration: 500 } },
          close: { animation: "timing", config: { duration: 500 } },
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      }}
    >
      <Stack.Screen
        name="Presentacion1"
        component={Presentacion1}
        options={() => ({
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </Stack.Navigator>
  );
}

export function PrincipalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormularioGeneral"
        component={FormularioGeneralStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListadoAyudas"
        component={AyudasStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DescargoResponsabilidad"
        component={DescargoResponsabilidad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PoliticaPrivacidad"
        component={PoliticaPrivacidad}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
