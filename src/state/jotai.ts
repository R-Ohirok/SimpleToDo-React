import { atom } from "jotai";
import type { ThemeType } from "../types";

export const themeAtom = atom<ThemeType>('light');