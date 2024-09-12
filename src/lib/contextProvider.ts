import { useContext, createContext } from "react";

export const PageHome = createContext<any>(null);

export function usePostContext() {
  return useContext(PageHome);
}
