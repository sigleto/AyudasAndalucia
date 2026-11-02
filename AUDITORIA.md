# Inventario inicial y auditoría

Fecha: 2026-10-30

## Configuración inicial

Expo 52 / React Native 0.76.7 / React 18.3.1; Drawer y Stack anidados. 8 categorías. No había servidor ni persistencia de favoritos. AdMob 14.9.0 con banner, intersticial automático y exportación condicionada a recompensa. Configuración AdMob fuera de `expo` ignorada por Expo CLI.

## Archivos originales

- `legacy/components/Anuncios/AnuncioBanner.tsx`
- `legacy/components/Anuncios/AnuncioIntersticial.tsx`
- `legacy/components/Anuncios/AnuncioRecompensado.tsx`
- `legacy/components/DescargoResponsabilidad.tsx`
- `legacy/components/desgloseAyudas/Agrícolas/AyudasAgricultoresJovenes.tsx`
- `legacy/components/desgloseAyudas/Agrícolas/AyudasModernizacionMaquinaria.tsx`
- `legacy/components/desgloseAyudas/Agrícolas/MedidasSectoriales.tsx`
- `legacy/components/desgloseAyudas/Desempleo/BecaSegundaOportunidad.tsx`
- `legacy/components/desgloseAyudas/Desempleo/EmigrantesRetornadas.tsx`
- `legacy/components/desgloseAyudas/Desempleo/TrabajadoresAgrarios.tsx`
- `legacy/components/desgloseAyudas/Desempleo/VictimasViolenciaGenero.tsx`
- `legacy/components/desgloseAyudas/Discapacidad/AyudasContratacionPersonasCuidadoras.tsx`
- `legacy/components/desgloseAyudas/Discapacidad/PrestacionesSocialesDiscapacidad.tsx`
- `legacy/components/desgloseAyudas/Discapacidad/SubvencionesIndividuales.tsx`
- `legacy/components/desgloseAyudas/Educación/Beca6000.tsx`
- `legacy/components/desgloseAyudas/Educación/BecaAdriano.tsx`
- `legacy/components/desgloseAyudas/Emprendedores/ProgramaAndaluciaEmprende.tsx`
- `legacy/components/desgloseAyudas/Emprendedores/ProgramaCuotaCero.tsx`
- `legacy/components/desgloseAyudas/Emprendedores/ProgramaEmpleaT.tsx`
- `legacy/components/desgloseAyudas/Emprendedores/SubvencionesTrabajoAutonomo.tsx`
- `legacy/components/desgloseAyudas/PrestacionesFamiliares/AyudaPartosMultiples.tsx`
- `legacy/components/desgloseAyudas/PrestacionesFamiliares/AyudasGuarderia.tsx`
- `legacy/components/desgloseAyudas/PrestacionesFamiliares/BonoCarestia.tsx`
- `legacy/components/desgloseAyudas/Sociales/AyudasEmergenciaSocial.tsx`
- `legacy/components/desgloseAyudas/Sociales/ProgramaSolidaridadAlimentaria.tsx`
- `legacy/components/desgloseAyudas/Sociales/RentaMinimaReinsercion.tsx`
- `legacy/components/desgloseAyudas/Vivienda/AyudasAlAlquilerPersonasVulnerables.tsx`
- `legacy/components/desgloseAyudas/Vivienda/ProgramaGarantiaViviendaJoven.tsx`
- `legacy/components/desgloseAyudas/Vivienda/ProgramasRehabilitacionVIvienda.tsx`
- `legacy/components/Home.tsx`
- `legacy/components/Informes/InformeAyudasAgricultores.tsx`
- `legacy/components/Informes/InformeAyudasContratacionCuidadores.tsx`
- `legacy/components/Informes/InformeAyudasEmigrantesRetornados.tsx`
- `legacy/components/Informes/InformeAyudasSectoriales.tsx`
- `legacy/components/Informes/InformeAyudasTrabajadoresAgrarios.tsx`
- `legacy/components/Informes/InformeBecasSegundaOportunidad.tsx`
- `legacy/components/Informes/InformeGarantiaViviendaJoven.tsx`
- `legacy/components/Informes/InformePrestacionesDiscapacidad.tsx`
- `legacy/components/Informes/InformeRentaMinima.tsx`
- `legacy/components/Informes/InformeSubvencionesAutonomos.tsx`
- `legacy/components/Informes/InformeSubvencionesDiscapacidad.tsx`
- `legacy/components/Listado/AyudasAgricolas.tsx`
- `legacy/components/Listado/AyudasSociales.tsx`
- `legacy/components/Listado/AyudasVivienda.tsx`
- `legacy/components/Listado/BecasEstudio.tsx`
- `legacy/components/Listado/Discapacidad.tsx`
- `legacy/components/Listado/Emprendedores.tsx`
- `legacy/components/Listado/PrestacionesDescendientes.tsx`
- `legacy/components/Listado/SubsidiosDesempleo.tsx`
- `legacy/components/ListadoDeAyudas.tsx`
- `legacy/components/navigator.tsx`
- `legacy/components/PoliticaPrivacidad.tsx`
- `legacy/components/Presentacion/Presentacion1.tsx`
- `legacy/components/Simuladores/SimuladorAyudasAgricultores.tsx`
- `legacy/components/Simuladores/SimuladorAyudasAlquiler.tsx`
- `legacy/components/Simuladores/SimuladorAyudasContratacionCuidadores.tsx`
- `legacy/components/Simuladores/SimuladorAyudasEmergencia.tsx`
- `legacy/components/Simuladores/SimuladorAyudasEmigrantesRetornados.tsx`
- `legacy/components/Simuladores/SimuladorAyudasGuarderia.tsx`
- `legacy/components/Simuladores/SimuladorAyudasPartosMultiples.tsx`
- `legacy/components/Simuladores/SimuladorAyudasSectoriales.tsx`
- `legacy/components/Simuladores/SimuladorAyudasTrabajadoresAgrarios.tsx`
- `legacy/components/Simuladores/SimuladorBeca6000.tsx`
- `legacy/components/Simuladores/SimuladorBecaAdriano.tsx`
- `legacy/components/Simuladores/SimuladorBecasSegundaOportunidad.tsx`
- `legacy/components/Simuladores/SimuladorBonoCarestia.tsx`
- `legacy/components/Simuladores/SimuladorCuotaCero.tsx`
- `legacy/components/Simuladores/SimuladorEmpleaT.tsx`
- `legacy/components/Simuladores/SimuladorGarantiaViviendaJoven.tsx`
- `legacy/components/Simuladores/SimuladorPrestacionesDiscapacidad.tsx`
- `legacy/components/Simuladores/SimuladorRehabilitacionVivienda.tsx`
- `legacy/components/Simuladores/SimuladorRentaMinima.tsx`
- `legacy/components/Simuladores/SimuladorSolidaridadAlimentaria.tsx`
- `legacy/components/Simuladores/SimuladorSubvencionesAutonomos.tsx`
- `legacy/components/Simuladores/SimuladorSubvencionesDiscapacidad.tsx`
- `legacy/components/SimuladorGeneral/FormularioGeneral.tsx`
- `legacy/components/SimuladorGeneral/RequisitosGeneral.ts`

## Rutas declaradas originalmente

- `Home`
- `DescargoResponsabilidad`
- `PoliticaPrivacidad`
- `SubsidiosDesempleo`
- `AyudasVivienda`
- `AyudaDescendientes`
- `BecasEstudio`
- `Emprendedores`
- `Discapacidad`
- `AyudasSociales`
- `AyudasAgricolas`
- `AyudasAgricultoresJovenes`
- `AyudasModernizacionMaquinaria`
- `AyudasMejoraRendimiento`
- `BecasSegundaOportunidad`
- `AyudasEmigrantesRetornados`
- `AyudasTrabajadoresAgrarios`
- `AyudasVictimasViolenciaGenero`
- `AyudasContratacionPersonasCuidadoras`
- `PrestacionesSocialesPersonasDiscapacidad`
- `SubvencionesIndividuales`
- `Beca6000`
- `BecaAdriano`
- `ProgramaAndaluciaEmprende`
- `ProgramaCuotaCero`
- `ProgramaEmpleaT`
- `SubvencionesTrabajoAutonomo`
- `AyudasPartosMultiples`
- `AyudasGuarderias`
- `BonoCarestia`
- `AyudasEmergenciaSocial`
- `ProgramaSolidaridadAlimentaria`
- `RentaMinimaReinsercion`
- `AyudasAlAlquilerPersonasVulnerables`
- `ProgramaGarantiaViviendaJoven`
- `ProgramasRehabilitacionVivienda`
- `SimuladorAyudasAgricultores`
- `SimuladorAyudasSectoriales`
- `SimuladorBecasSegundaOportunidad`
- `SimuladorAyudasEmigrantesRetornados`
- `SimuladorAyudasTrabajadoresAgrarios`
- `SimuladorAyudasContratacionCuidadores`
- `SimuladorPrestacionesDiscapacidad`
- `SimuladorSubvencionesDiscapacidad`
- `SimuladorBeca6000`
- `SimuladorBecaAdriano`
- `SimuladorCuotaCero`
- `SimuladorEmpleaT`
- `SimuladorSubvencionesAutonomos`
- `SimuladorAyudasPartosMultiples`
- `SimuladorAyudasGuarderia`
- `SimuladorBonoCarestia`
- `SimuladorAyudasEmergencia`
- `SimuladorSolidaridadAlimentaria`
- `SimuladorRentaMinima`
- `SimuladorAyudasAlquiler`
- `SimuladorGarantiaViviendaJoven`
- `SimuladorRehabilitacionVivienda`
- `InformeAyudasAgricultores`
- `InformeAyudasContratacionCuidadores`
- `InformeAyudasEmigrantesRetornados`
- `InformeAyudasSectoriales`
- `InformeAyudasTrabajadoresAgrarios`
- `InformeBecasSegundaOportunidad`
- `InformeGarantiaViviendaJoven`
- `InformePrestacionesDiscapacidad`
- `InformeRentaMinima`
- `InformeSubvencionesAutonomos`
- `InformeSubvencionesDiscapacidad`
- `FormularioGeneral`
- `Presentacion1`
- `FormularioGeneralP`
- `ListadoAyudas`

## Auditoría de los 22 simuladores originales

Se inspeccionaron todos los formularios. Esta lista recoge líneas relevantes de sus reglas; el código íntegro queda archivado. Todos se sustituyen por guías de requisitos de la ficha correspondiente, salvo partos múltiples, rehecho con la regla del INSS. El Bono Carestía pasa a histórico sin simulación.

### SimuladorAyudasAgricultores.tsx

Formulario de condiciones parciales: no acredita todos los requisitos. Se sustituye por una guía sin concesión automática.

### SimuladorAyudasAlquiler.tsx

- `if (rentaNum > 900) {`
- `const importeAyuda = (rentaNum * porcentajeCobertura) / 100;`

### SimuladorAyudasContratacionCuidadores.tsx

- `rentaNum <= 30000 // Límite de renta familiar como ejemplo`
- `setCuantia('Subvención estimada: ${baseCuantia.toFixed(2)}€.');`
- `setCuantia("");`

### SimuladorAyudasEmergencia.tsx

- `recursosNum < 600 && // Ejemplo: IPREM mensual como referencia`
- `importeBase = 1000; // Ejemplo: ayuda para vivienda`
- `importeBase = 500; // Ejemplo: ayuda para alimentación`
- `importeBase = 300; // Ejemplo: ayuda para suministros esenciales`

### SimuladorAyudasEmigrantesRetornados.tsx

- `rentaNum <= 1200 // Límite de renta establecido como ejemplo`
- `setCuantia("426€ mensuales durante un máximo de 6 meses.");`
- `setCuantia("");`

### SimuladorAyudasGuarderia.tsx

- `ingresosNum <= hijosNum * 1.5 * 600 // Ejemplo: IPREM mensual multiplicado por número de hijos`
- `if (ingresosNum <= hijosNum * 1.2 * 600) {`
- `} else if (ingresosNum <= hijosNum * 1.5 * 600) {`
- `const costeAnualGuarderia = 3000; // Ejemplo: coste promedio anual de una guardería`
- `const importeAyuda =`

### SimuladorAyudasPartosMultiples.tsx

- `ingresosNum <= 1.5 * 600 // Ejemplo: IPREM mensual en euros`

### SimuladorAyudasSectoriales.tsx

Formulario de condiciones parciales: no acredita todos los requisitos. Se sustituye por una guía sin concesión automática.

### SimuladorAyudasTrabajadoresAgrarios.tsx

- `rentaNum <= 1200 // Límite de renta como ejemplo`
- `setCuantia("480€ mensuales durante un máximo de 6 meses.");`
- `setCuantia("");`

### SimuladorBeca6000.tsx

- `rentaNum <= 1.5 && // Ejemplo: umbral de renta familiar en relación al IPREM`

### SimuladorBecaAdriano.tsx

Formulario de condiciones parciales: no acredita todos los requisitos. Se sustituye por una guía sin concesión automática.

### SimuladorBecasSegundaOportunidad.tsx

- `setCuantia("600€ mensuales durante un máximo de 10 meses.");`
- `setCuantia("");`

### SimuladorBonoCarestia.tsx

- `rentaNum <= miembrosNum * 1.5 * 600 // Ejemplo: IPREM mensual multiplicado por número de miembros y un factor de ajuste`
- `let importeBase = 200; // Ejemplo: importe base del bono`
- `const importeTotal = importeBase + (miembrosNum - 1) * incrementoPorMiembro;`

### SimuladorCuotaCero.tsx

- `if (ingresosNetos && ingresosNum < 15600) {`

### SimuladorEmpleaT.tsx

Formulario de condiciones parciales: no acredita todos los requisitos. Se sustituye por una guía sin concesión automática.

### SimuladorGarantiaViviendaJoven.tsx

- `const aval = precioNum * 0.15;`
- `const financiacionTotal = precioNum * 0.95;`

### SimuladorPrestacionesDiscapacidad.tsx

- `rentaNum <= 1.25`
- `if (rentaNum <= 1) {`
- `importe += rentaNum > 1 ? 750 : 6000; // Productos tecnológicos o vehículos`

### SimuladorRehabilitacionVivienda.tsx

- `ingresosNum > 5.5 * 600 ||`
- `(vulnerabilidad.toUpperCase() === "S" && ingresosNum > 3 * 600)`

### SimuladorRentaMinima.tsx

- `ingresosNum < 604.22 + (miembrosNum - 1) * (604.22 * 0.3) &&`
- `const baseCuantia = 604.22;`
- `const importeTotal =`

### SimuladorSolidaridadAlimentaria.tsx

- `ingresosNum <= miembrosNum * 600 && // Ejemplo: IPREM mensual multiplicado por número de miembros`
- `const basePorMiembro = 100; // Ejemplo: importe base por miembro del hogar`
- `const extraPorMenorEscolarizado = 50; // Ejemplo: importe adicional por menor escolarizado`
- `const importeTotal =`

### SimuladorSubvencionesAutonomos.tsx

Formulario de condiciones parciales: no acredita todos los requisitos. Se sustituye por una guía sin concesión automática.

### SimuladorSubvencionesDiscapacidad.tsx

- `if (discapacidadNum >= 33 && residencia.toUpperCase() === "S" && rentaNum <= 1.25) {`

## Hallazgos y sustituciones

- RMISA y solidaridad alimentaria enlazaban al mismo procedimiento 24580. Se separan RMISA (12563) y BÁSICO (BOJA 2026/124/3).
- Bono Carestía calculaba cantidades por miembro sin respaldo: histórico, sin nuevas solicitudes.
- Emergencia, guardería, alquiler, discapacidad y cuidadores incluían bases o límites de ejemplo; se retiran esos cálculos.
- Garantía Vivienda calculaba un aval del 15 %: sustituido por orientación sobre el instrumento actual, sin aprobación bancaria ficticia.
- Segunda Oportunidad se mueve de desempleo a estudios; sigue encontrándose por colectivo desempleado.
- Prestaciones sociales por discapacidad se concreta en PNC; contratación de cuidadores se sustituye por dependencia/PIA. No se ha confirmado la antigua subvención genérica.
- Ayudas regionales de partos se sustituyen por la prestación estatal identificada expresamente. No se mezclan sus reglas.
- Modernización de maquinaria se concreta en Renove; medidas sectoriales se reorganizan como guía PAC.
- Las 11 pantallas de informe se reemplazan por exportación común desde cada guía (PDF nativo y compartir en web).
- El formulario general tenía opciones vacías y simuladores con rutas no registradas en el stack activo. El nuevo Drawer accede a un único Stack padre de fichas/guías tipadas; no se conservan enlaces a pantallas antiguas.
- Ampliaciones: IMV/infancia, prestación contributiva, subsidio por agotamiento, beca general, dependencia y bono social eléctrico.

## Flujo actual

Inicio / Buscar / Convocatorias / Favoritos / Orientación / Información (Drawer) → Ficha(id) → Guía(id). El botón Atrás regresa al origen. Toda categoría, búsqueda y filtro consulta el mismo catálogo.
