import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Share,
  Text,
  TextInput,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { aids, REVIEW_DATE } from "./domain/catalog";
import {
  Aid,
  AidStatus,
  Category,
  categories,
  statusLabels,
} from "./domain/types";
import {
  Answer,
  effectiveStatus,
  filterAids,
  guidance,
  multipleBirth,
} from "./domain/logic";
import { MenuRoutes, Navigation, RootRoutes } from "./navigation";
import { useFavorites } from "./state/Favorites";
import {
  Body,
  Button,
  Card,
  Chip,
  Heading,
  Notice,
  Page,
  Title,
  colors,
  openSource,
  s,
} from "./ui";
import AdBanner, { AdPrivacy } from "./ads/AdBanner";
import { useGuideInterstitial } from "./ads/useGuideInterstitial";
import { exportReport } from "./reports";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Mosaic, OpportunityArt, categoryArt, e } from "./editorial";

function Status({ aid }: { aid: Aid }) {
  const state = effectiveStatus(aid);
  const warning = ["historical", "unknown", "closed", "pending"].includes(
    state,
  );
  return (
    <View style={[s.badge, warning && { backgroundColor: colors.amber }]}>
      <Text style={[s.badgeText, warning && { color: colors.amberInk }]}>
        {statusLabels[state]}
      </Text>
    </View>
  );
}
function FavoriteButton({ aid }: { aid: Aid }) {
  const favorites = useFavorites();
  const saved = favorites.ids.includes(aid.id);
  return (
    <Button
      secondary
      disabled={!favorites.ready || favorites.busy}
      label={saved ? "★ Guardada · quitar de favoritos" : "☆ Guardar ayuda"}
      onPress={() => {
        void favorites.toggle(aid.id);
      }}
    />
  );
}
function StorageNotice() {
  const favorites = useFavorites();
  if (!favorites.error) return null;
  return (
    <Card>
      <Notice>{favorites.error}</Notice>
      <Button
        label="Reintentar favoritos"
        onPress={() => {
          void favorites.reload();
        }}
      />
    </Card>
  );
}
function AidCard({ aid }: { aid: Aid }) {
  const navigation = useNavigation<Navigation>();
  const art = categoryArt[aid.category];
  return (
    <View style={e.listing}>
      <View style={e.listingTop}>
        <View style={[e.iconDisc, { backgroundColor: art.color }]}>
          <Icon name={art.icon} size={23} color={colors.ink} />
        </View>
        <Text style={e.kicker}>{aid.category}</Text>
      </View>
      <Heading>{aid.name}</Heading>
      <Status aid={aid} />
      <Body>{aid.summary}</Body>
      <Text style={s.muted}>{aid.agency}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate("Ficha", { id: aid.id })}
        style={({ pressed }) => [e.textLink, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={e.linkText}>Ver ayuda →</Text>
      </Pressable>
    </View>
  );
}
export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const [query, setQuery] = useState("");
  const open = aids.filter((a) => effectiveStatus(a) === "open");
  const search = () =>
    navigation.navigate("Menu", { screen: "Buscar", params: { query } });
  const calculator = aids.find((a) => a.calculator)!;
  return (
    <Page footer={<AdBanner />}>
      <View style={e.cover}>
        <Text style={e.kicker}>ANDALUCÍA / GUÍA DE OPORTUNIDADES</Text>
        <Text accessibilityRole="header" style={e.coverTitle}>
          ¿Qué ayuda estás buscando?
        </Text>
        <Body>
          Encuentra apoyos para tu día a día y entiende cómo dar el siguiente
          paso.
        </Body>
        <View style={e.search}>
          <Icon name="magnify" size={26} color={colors.ink} />
          <TextInput
            accessibilityLabel="Buscar desde Inicio"
            placeholder="Vivienda, estudios, familia…"
            placeholderTextColor={colors.muted}
            style={e.searchInput}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={search}
            returnKeyType="search"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buscar ayudas →"
            style={e.searchGo}
            onPress={search}
          >
            <Icon name="arrow-right" size={26} color="white" />
          </Pressable>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Orientarme según mi situación"
        style={({ pressed }) => [e.orient, { opacity: pressed ? 0.8 : 1 }]}
        onPress={() => navigation.navigate("Menu", { screen: "Orientación" })}
      >
        <Icon name="compass-outline" size={42} color={colors.ink} />
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={e.orientTitle}>¿No sabes por dónde empezar?</Text>
          <Text style={{ color: colors.ink, fontSize: 15 }}>
            Orientarme según mi situación →
          </Text>
        </View>
      </Pressable>
      <View style={e.sectionHead}>
        <Heading>Explora a tu manera</Heading>
        <Text style={e.sectionNumber}>01 / TEMAS</Text>
      </View>
      <Mosaic
        onSelect={(category) =>
          navigation.navigate("Menu", {
            screen: "Buscar",
            params: { category },
          })
        }
      />
      <View style={e.simulator}>
        <Text style={e.kicker}>02 / DEL DATO AL SIGUIENTE PASO</Text>
        <OpportunityArt />
        <Text accessibilityRole="header" style={e.simulatorTitle}>
          Menos dudas. Más perspectiva.
        </Text>
        <Body>
          Simula la prestación por parto o adopción múltiples, paso a paso.
        </Body>
        <Button
          label="Empezar simulación →"
          onPress={() => navigation.navigate("Guía", { id: calculator.id })}
        />
        <Text style={s.muted}>
          Una estimación orientativa, nunca una concesión.
        </Text>
      </View>
      <View style={e.sectionHead}>
        <Heading>En el radar</Heading>
        <Text style={e.sectionNumber}>03 / PLAZOS</Text>
      </View>
      <Button
        secondary
        label={"Ver convocatorias · " + open.length + " abiertas verificadas"}
        onPress={() => navigation.navigate("Menu", { screen: "Convocatorias" })}
      />
      {open.slice(0, 2).map((a) => (
        <AidCard key={a.id} aid={a} />
      ))}
      <View style={e.section}>
        <Heading>Antes de solicitar, comprueba.</Heading>
        <Body>
          Cada ficha distingue plazos, requisitos y fuentes. Un resultado
          orientativo nunca sustituye una resolución.
        </Body>
        <Text style={s.muted}>
          Guía independiente. No somos una administración pública. Revisión del
          catálogo: {REVIEW_DATE}. Las novedades posteriores se consultan en la
          fuente oficial.
        </Text>
      </View>
    </Page>
  );
}
export function CatalogScreen() {
  const route =
    useRoute<RouteProp<MenuRoutes, "Buscar" | "Convocatorias" | "Favoritos">>();
  const favorites = useFavorites();
  const isFavorites = route.name === "Favoritos";
  const isCalls = route.name === "Convocatorias";
  const initialCategory =
    route.params && "category" in route.params
      ? route.params.category
      : undefined;
  const initialQuery =
    route.params && "query" in route.params ? route.params.query : undefined;
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<Category | undefined>(
    initialCategory,
  );
  const [audience, setAudience] = useState<string>();
  const [status, setStatus] = useState<AidStatus | undefined>(
    isCalls ? "open" : undefined,
  );
  const [filtersVisible, setFiltersVisible] = useState(false);
  useEffect(() => {
    setCategory(initialCategory);
    setQuery(initialQuery ?? "");
    setAudience(undefined);
    setStatus(isCalls ? "open" : undefined);
  }, [route.params, initialCategory, initialQuery, isCalls]);
  const results = filterAids(aids, {
    query,
    category,
    audience,
    status,
    favorites: isFavorites ? favorites.ids : undefined,
  });
  const reset = () => {
    setQuery("");
    setCategory(undefined);
    setAudience(undefined);
    setStatus(undefined);
  };
  return (
    <Page footer={<AdBanner />}>
      <Title>
        {isFavorites
          ? "Tus ayudas guardadas"
          : isCalls
            ? "Convocatorias"
            : "Encuentra tu ayuda"}
      </Title>
      <Body>
        {isFavorites
          ? "Un lugar para volver a lo que te interesa."
          : "Busca por necesidad, nombre o colectivo y consulta cada paso."}
      </Body>
      <StorageNotice />
      {isFavorites && !favorites.ready && !favorites.error ? (
        <ActivityIndicator
          accessibilityLabel="Cargando favoritos"
          color={colors.primary}
        />
      ) : null}
      <TextInput
        accessibilityLabel="Buscar ayudas"
        placeholder="Alquiler, familia, estudios…"
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
        style={s.input}
        returnKeyType="search"
      />
      <Button
        secondary
        label={`${filtersVisible ? "Ocultar" : "Mostrar"} filtros${category || audience || status ? " · activos" : ""}`}
        onPress={() => setFiltersVisible(!filtersVisible)}
      />
      {category && <Text style={s.muted}>Categoría: {category}</Text>}
      {status && <Text style={s.muted}>Estado: {statusLabels[status]}</Text>}
      {filtersVisible && (
        <Card>
          <Heading>Categoría</Heading>
          <View style={s.row}>
            <Chip
              label="Todas"
              selected={!category}
              onPress={() => setCategory(undefined)}
            />
            {categories.map((c) => (
              <Chip
                key={c}
                label={c}
                selected={c === category}
                onPress={() => setCategory(c)}
              />
            ))}
          </View>
          <Heading>Colectivo destinatario</Heading>
          <View style={s.row}>
            <Chip
              label="Todos"
              selected={!audience}
              onPress={() => setAudience(undefined)}
            />
            {[...new Set(aids.flatMap((a) => a.audience))].sort().map((c) => (
              <Chip
                key={c}
                label={c}
                selected={c === audience}
                onPress={() => setAudience(c)}
              />
            ))}
          </View>
          <Heading>Estado de convocatoria</Heading>
          <View style={s.row}>
            <Chip
              label="Todos los estados"
              selected={!status}
              onPress={() => setStatus(undefined)}
            />
            {(Object.keys(statusLabels) as AidStatus[]).map((c) => (
              <Chip
                key={c}
                label={statusLabels[c]}
                selected={c === status}
                onPress={() => setStatus(c)}
              />
            ))}
          </View>
          <Button secondary label="Limpiar filtros" onPress={reset} />
        </Card>
      )}
      <Text accessibilityLiveRegion="polite" style={s.muted}>
        {results.length}{" "}
        {results.length === 1 ? "ayuda encontrada" : "ayudas encontradas"}
      </Text>
      {isCalls && (
        <Notice>
          Los plazos pueden ampliarse o agotarse los fondos. «Permanente» indica
          un derecho o servicio sujeto a condiciones, no una concesión
          garantizada.
        </Notice>
      )}
      {results.length === 0 ? (
        <Card>
          <Heading>
            {isFavorites && !favorites.ids.length
              ? "Guarda tu primera ayuda"
              : "No encontramos coincidencias"}
          </Heading>
          <Body>
            {isFavorites && !favorites.ids.length
              ? "Abre una ficha y pulsa «Guardar ayuda». Se conserva en este dispositivo."
              : "Prueba otra palabra o elimina algún filtro."}
          </Body>
          <Button
            secondary
            label="Limpiar búsqueda y filtros"
            onPress={reset}
          />
        </Card>
      ) : (
        results.map((a) => <AidCard key={a.id} aid={a} />)
      )}
    </Page>
  );
}
function Section({ title, lines }: { title: string; lines: string[] }) {
  const numbered = title === "Cómo solicitarla";
  return (
    <View style={title === "Cuantía" ? e.amount : e.section}>
      <Heading>{title}</Heading>
      {lines.map((line, index) => (
        <View key={index} style={e.step}>
          {(numbered || lines.length > 1) && (
            <Text
              style={
                numbered
                  ? e.stepNumber
                  : { color: colors.primary, fontSize: 20 }
              }
            >
              {numbered ? String(index + 1).padStart(2, "0") : "•"}
            </Text>
          )}
          <View style={{ flex: 1 }}>
            <Body>{line}</Body>
          </View>
        </View>
      ))}
    </View>
  );
}
export function DetailScreen() {
  const { params } = useRoute<RouteProp<RootRoutes, "Ficha">>();
  const navigation = useNavigation<Navigation>();
  const aid = aids.find((a) => a.id === params.id);
  if (!aid)
    return (
      <Page>
        <Title>Ayuda no encontrada</Title>
        <Body>Esta ficha ya no está disponible. Vuelve al catálogo.</Body>
        <Button
          label="Buscar ayudas"
          onPress={() =>
            navigation.navigate("Menu", { screen: "Buscar", params: {} })
          }
        />
      </Page>
    );
  const share = async () => {
    try {
      await Share.share({
        message: `${aid.name}\n${aid.summary}\n${statusLabels[effectiveStatus(aid)]}. Revisada: ${aid.reviewed}.\n${aid.source}\nGuía independiente; comprueba la información oficial.`,
      });
    } catch {
      Alert.alert("No se pudo compartir", "Vuelve a intentarlo.");
    }
  };
  return (
    <Page
      footer={
        <View style={e.sticky}>
          <Button
            label="Consultar fuente oficial ↗"
            onPress={() => {
              void openSource(aid.source);
            }}
          />
        </View>
      }
    >
      <View
        style={[e.detailTop, { borderColor: categoryArt[aid.category].color }]}
      >
        <View style={e.listingTop}>
          <Icon
            name={categoryArt[aid.category].icon}
            size={32}
            color={colors.ink}
          />
          <Text style={e.kicker}>{aid.category}</Text>
        </View>
        <Title>{aid.name}</Title>
        <Status aid={aid} />
        <Text style={s.muted}>
          {aid.agency} · Revisada: {aid.reviewed}
        </Text>
      </View>
      <Notice>
        {effectiveStatus(aid) === "historical"
          ? "Ficha histórica. No solicites esta convocatoria como si estuviera vigente."
          : "Información orientativa. Confirma requisitos completos y novedades en la fuente oficial antes de actuar."}
      </Notice>
      <FavoriteButton aid={aid} />
      <StorageNotice />
      <Button
        secondary
        label="Compartir ayuda"
        onPress={() => {
          void share();
        }}
      />
      <Section title="Qué es" lines={[aid.summary]} />
      <Section title="A quién va dirigida" lines={[aid.audience.join(" · ")]} />
      <Section title="Requisitos" lines={aid.requirements} />
      <Section title="Cuantía" lines={[aid.amount]} />
      <Section title="Compatibilidades" lines={[aid.compatibility]} />
      <Section title="Plazo" lines={[aid.period]} />
      <Section title="Cómo solicitarla" lines={aid.steps} />
      <Section title="Documentación básica" lines={aid.documents} />
      {aid.simulatorSource && (
        <Button
          label="Abrir simulador oficial ↗"
          onPress={() => {
            void openSource(aid.simulatorSource!);
          }}
        />
      )}
      {effectiveStatus(aid) !== "historical" && (
        <Button
          label={
            aid.calculator
              ? "Simular importe orientativo"
              : "Preparar mi solicitud · guía"
          }
          onPress={() => navigation.navigate("Guía", { id: aid.id })}
        />
      )}
      <View style={e.section}>
        <Heading>Fuente oficial</Heading>
        <Text selectable style={s.muted}>
          {aid.source}
        </Text>
        <Text style={s.muted}>
          Comprobada el {aid.reviewed}. El catálogo funciona sin conexión; abrir
          la fuente requiere internet.
        </Text>
      </View>
      {aid.related
        ?.map((id) => aids.find((a) => a.id === id))
        .filter((a): a is Aid => !!a)
        .map((a) => (
          <AidCard key={a.id} aid={a} />
        ))}
    </Page>
  );
}
export function GuideScreen() {
  const { params } = useRoute<RouteProp<RootRoutes, "Guía">>();
  useGuideInterstitial(params.id);
  const aid = aids.find((a) => a.id === params.id);
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [children, setChildren] = useState("");
  const [disabled, setDisabled] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<string[]>();
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  useEffect(() => {
    setStage(0);
    setAnswers({});
    setChildren("");
    setDisabled("");
    setYear("");
    setResult(undefined);
    setError("");
  }, [params.id]);
  useEffect(() => {
    if (result) setStage(2);
  }, [result]);
  if (!aid)
    return (
      <Page>
        <Title>Guía no disponible</Title>
      </Page>
    );
  const change = (setter: (value: string) => void, value: string) => {
    setter(value);
    setResult(undefined);
    setError("");
  };
  const calculate = () => {
    setResult(undefined);
    setError("");
    try {
      const checklist = guidance(aid.requirements, answers);
      if (aid.calculator) {
        if (aid.requirements.some((_, i) => answers[i] !== "yes")) {
          setResult([
            ...checklist,
            "No calculamos un importe porque hay condiciones esenciales no confirmadas. Consulta al INSS.",
          ]);
          return;
        }
        const amount = multipleBirth(children, disabled, year);
        setResult([
          ...checklist,
          `${amount.count} hijos simultáneos + ${amount.disabilityCount} cómputos adicionales por discapacidad = ${amount.weighted} hijos computables.`,
          `Tramo: ${amount.factor} veces el SMI mensual de 2026 (${amount.smi} €).`,
          `Estimación de pago único: ${amount.total.toLocaleString("es-ES")} €. No es una mensualidad.`,
          "Solo se estima el importe para hechos causantes de 2026. El INSS debe verificar todos los requisitos y supuestos especiales.",
        ]);
      } else
        setResult([
          ...checklist,
          "Esta guía no determina elegibilidad ni importe. Es necesario comprobar el expediente o la convocatoria.",
          ...aid.steps,
        ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Revisa los datos.");
    }
  };
  const report = async () => {
    if (!result) return;
    setExporting(true);
    try {
      await exportReport(aid, [aid.period, ...result]);
    } catch {
      setError(
        "No se pudo generar o compartir el informe. Inténtalo de nuevo.",
      );
    } finally {
      setExporting(false);
    }
  };
  return (
    <Page key={stage}>
      <Text style={e.kicker}>
        TU RECORRIDO /{" "}
        {stage === 2 ? "RESULTADO" : stage === 1 ? "DATOS" : "REQUISITOS"}
      </Text>
      <View
        accessibilityLabel={
          "Paso " +
          (stage === 2 ? (aid.calculator ? 3 : 2) : stage + 1) +
          " de " +
          (aid.calculator ? 3 : 2)
        }
      >
        <View style={e.progress}>
          {(aid.calculator ? [0, 1, 2] : [0, 2]).map((n) => (
            <View
              key={n}
              style={[
                e.progressLine,
                { backgroundColor: n <= stage ? colors.primary : colors.line },
              ]}
            />
          ))}
        </View>
        <Text style={s.muted}>
          {stage === 0
            ? "01 / Comprueba las condiciones"
            : stage === 1
              ? "02 / Completa tus datos"
              : (aid.calculator ? "03" : "02") + " / Tu orientación"}
        </Text>
      </View>
      <Text style={s.muted}>{aid.name}</Text>
      <Title>
        {aid.calculator
          ? "Una estimación, paso a paso"
          : "Prepara tu siguiente paso"}
      </Title>
      <Status aid={aid} />
      <Notice>
        {aid.period} Esta orientación no garantiza la concesión y tus respuestas
        no se guardan.
      </Notice>
      {stage === 0 && (
        <>
          <Body>
            Indica si cumples cada condición descrita. Sirve para identificar
            dudas que debes resolver con el organismo.
          </Body>
          {aid.requirements.map((r, i) => (
            <View key={i} style={e.question}>
              <Text style={e.questionNumber}>
                CONDICIÓN {String(i + 1).padStart(2, "0")} /{" "}
                {aid.requirements.length}
              </Text>
              <Body>{r}</Body>
              <View style={s.row}>
                {(
                  [
                    ["yes", "Sí"],
                    ["no", "No"],
                    ["unknown", "No lo sé"],
                  ] as const
                ).map(([value, label]) => (
                  <Chip
                    key={value}
                    label={label}
                    selected={answers[i] === value}
                    onPress={() => {
                      setAnswers({ ...answers, [i]: value });
                      setResult(undefined);
                      setError("");
                    }}
                  />
                ))}
              </View>
            </View>
          ))}
        </>
      )}
      {aid.calculator && stage === 1 && (
        <View style={e.section}>
          <Heading>Datos para el cálculo</Heading>
          <Body>
            Año del nacimiento o adopción. Determina qué SMI corresponde.
          </Body>
          <TextInput
            style={s.input}
            accessibilityLabel="Año del nacimiento o adopción"
            placeholder="2026"
            keyboardType="number-pad"
            value={year}
            onChangeText={(v) => change(setYear, v)}
          />
          <Body>
            Número de hijos del mismo parto o adopción (al menos dos).
          </Body>
          <TextInput
            style={s.input}
            accessibilityLabel="Número de hijos simultáneos"
            keyboardType="number-pad"
            value={children}
            onChangeText={(v) => change(setChildren, v)}
          />
          <Body>
            De ellos, cuántos tienen discapacidad reconocida de al menos el 33
            %. Introduce 0 si ninguno; computan doble.
          </Body>
          <TextInput
            style={s.input}
            accessibilityLabel="Hijos con discapacidad reconocida"
            keyboardType="number-pad"
            value={disabled}
            onChangeText={(v) => change(setDisabled, v)}
          />
          <Text style={s.muted}>
            SMI 2026: 1.221 €/mes · Real Decreto 126/2026.
          </Text>
          <Button
            secondary
            label="Consultar SMI oficial"
            onPress={() => {
              void openSource(
                "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815",
              );
            }}
          />
        </View>
      )}
      {error ? (
        <Text
          accessibilityRole="alert"
          style={{ color: "#A22E21", fontSize: 16 }}
        >
          {error}
        </Text>
      ) : null}
      {stage === 0 && aid.calculator && (
        <Button
          label="Continuar con mis datos →"
          onPress={() => {
            try {
              guidance(aid.requirements, answers);
              setError("");
              setStage(1);
            } catch (error) {
              setError(
                error instanceof Error
                  ? error.message
                  : "Revisa tus respuestas.",
              );
            }
          }}
        />
      )}
      {((stage === 0 && !aid.calculator) || stage === 1) && (
        <Button
          label={aid.calculator ? "Calcular orientación" : "Ver mi orientación"}
          onPress={calculate}
        />
      )}
      {stage > 0 && (
        <Button
          secondary
          label={
            stage === 2 && aid.calculator
              ? "Editar datos"
              : "Volver a las condiciones"
          }
          onPress={() => {
            setStage(stage === 2 && aid.calculator ? 1 : 0);
            setError("");
          }}
        />
      )}
      {result && stage === 2 && (
        <View style={e.result}>
          <Icon
            name="check-decagram-outline"
            size={44}
            color={colors.primary}
          />
          <Heading>Tu resultado orientativo</Heading>
          <View accessibilityLiveRegion="polite" style={{ gap: 12 }}>
            {[
              ...result.filter((line) =>
                line.startsWith("Estimación de pago único:"),
              ),
              ...result.filter(
                (line) => !line.startsWith("Estimación de pago único:"),
              ),
            ].map((line, i) => (
              <Text
                key={i}
                style={[
                  s.body,
                  line.startsWith("Estimación de pago único:") && {
                    fontSize: 26,
                    lineHeight: 34,
                    fontWeight: "800",
                    letterSpacing: -0.6,
                  },
                ]}
              >
                {line}
              </Text>
            ))}
          </View>
          <Notice>
            No es una resolución ni acredita el cumplimiento de los requisitos.
          </Notice>
          <Button
            secondary
            label={
              exporting
                ? "Preparando informe…"
                : Platform.OS === "web"
                  ? "Compartir informe"
                  : "Exportar informe PDF"
            }
            disabled={exporting}
            onPress={() => {
              void report();
            }}
          />
        </View>
      )}
      <Button
        secondary
        label="Comprobar o solicitar en la fuente oficial ↗"
        onPress={() => {
          void openSource(aid.source);
        }}
      />
    </Page>
  );
}
export function OrientScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [shown, setShown] = useState(false);
  const groups = [...new Set(aids.flatMap((a) => a.audience))].sort();
  const matches = aids.filter(
    (a) =>
      effectiveStatus(a) !== "historical" &&
      a.audience.some((group) => selected.includes(group)),
  );
  return (
    <Page>
      <Title>Empezamos por ti</Title>
      <Body>
        Selecciona las situaciones que encajen contigo. Puedes elegir varias; no
        necesitas introducir ingresos ni datos personales.
      </Body>
      <View style={s.row}>
        {groups.map((group) => (
          <Chip
            key={group}
            label={group}
            selected={selected.includes(group)}
            onPress={() => {
              setSelected(
                selected.includes(group)
                  ? selected.filter((x) => x !== group)
                  : [...selected, group],
              );
              setShown(false);
            }}
          />
        ))}
      </View>
      <Button
        label="Ver ayudas relacionadas"
        disabled={!selected.length}
        onPress={() => setShown(true)}
      />
      <Notice>
        Las coincidencias se basan en colectivos destinatarios, no en una
        evaluación de requisitos. También pueden aparecer convocatorias cerradas
        para que puedas prepararte.
      </Notice>
      {shown && (
        <>
          <Heading>{matches.length} ayudas para explorar</Heading>
          {matches.map((a) => (
            <AidCard key={a.id} aid={a} />
          ))}
        </>
      )}
    </Page>
  );
}
export function InfoScreen() {
  const favorites = useFavorites();
  return (
    <Page>
      <Title>Una guía independiente</Title>
      <Section
        title="Cómo funciona"
        lines={[
          "Busca una ayuda, revisa sus requisitos y comprueba la convocatoria en la fuente oficial.",
          "Guarda tus fichas favoritas y utiliza las guías para preparar tus dudas.",
          "Los cálculos solo se ofrecen con una regla verificada. No son una resolución administrativa.",
        ]}
      />
      <Section
        title="Responsabilidad y actualización"
        lines={[
          `Catálogo revisado el ${REVIEW_DATE}. La aplicación no representa a la Junta de Andalucía ni a otra administración.`,
          "Las fuentes pueden cambiar. Los plazos vencidos pasan a cerrados según la fecha del dispositivo en la zona horaria de Madrid. El catálogo no se actualiza automáticamente.",
        ]}
      />
      <Section
        title="Privacidad"
        lines={[
          "Sin cuentas ni servidor propio. Solo los identificadores de favoritos se guardan localmente. Las respuestas se mantienen en memoria mientras usas la pantalla.",
          "Los informes se generan cuando lo solicitas. Al compartirlos eliges la aplicación destinataria; el archivo puede permanecer en la caché del dispositivo.",
          "En Android, Google AdMob puede tratar identificadores y datos publicitarios según las preferencias disponibles. Las respuestas no se envían a AdMob.",
          "Los enlaces externos tienen sus propias políticas. Contacto: trianabaresapp@gmail.com.",
        ]}
      />
      <Button
        secondary
        label="Política de privacidad de Google ↗"
        onPress={() => {
          void openSource("https://policies.google.com/privacy?hl=es");
        }}
      />
      <AdPrivacy />
      <StorageNotice />
      <Button
        secondary
        label="Borrar favoritos de este dispositivo"
        disabled={favorites.busy}
        onPress={() =>
          Alert.alert(
            "Borrar favoritos",
            "Se eliminarán todas las ayudas guardadas en este dispositivo.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Borrar",
                style: "destructive",
                onPress: () => {
                  void favorites.clear();
                },
              },
            ],
          )
        }
      />
      <Button
        secondary
        label="Compartir la aplicación"
        onPress={() => {
          void Share.share({
            message:
              "Ayudas Públicas Andalucía · guía independiente. https://play.google.com/store/apps/details?id=com.sigleto.AyudasAndalucia",
          }).catch(() => Alert.alert("No se pudo compartir"));
        }}
      />
    </Page>
  );
}
