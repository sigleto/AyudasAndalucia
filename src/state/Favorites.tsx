import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { aids } from "../domain/catalog";
import { decodeFavorites } from "../domain/logic";
const KEY = "ayudas-andalucia:favorites:v1";
type State = {
  ids: string[];
  ready: boolean;
  busy: boolean;
  error: string;
  toggle: (id: string) => Promise<void>;
  reload: () => Promise<void>;
  clear: () => Promise<void>;
};
const Context = createContext<State | null>(null);
export function FavoritesProvider({ children }: React.PropsWithChildren) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  const reload = async () => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setReady(false);
    try {
      setIds(
        decodeFavorites(
          await AsyncStorage.getItem(KEY),
          aids.map((a) => a.id),
        ),
      );
      setReady(true);
    } catch {
      setError(
        "No se pudieron leer los favoritos. Reintenta o restablece el almacenamiento desde Información.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  useEffect(() => {
    void reload();
  }, []);
  const save = async (next: string[]) => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      setIds(next);
      setReady(true);
    } catch {
      setError(
        "No se pudo guardar el cambio. Tus favoritos anteriores se mantienen.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  return (
    <Context.Provider
      value={{
        ids,
        ready,
        busy,
        error,
        reload,
        clear: () => save([]),
        toggle: (id) =>
          ready
            ? save(
                ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
              )
            : Promise.resolve(),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useFavorites() {
  const context = useContext(Context);
  if (!context) throw new Error("FavoritesProvider missing");
  return context;
}
