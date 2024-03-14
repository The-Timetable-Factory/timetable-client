import { createContext, useContext } from 'react';

interface DarkModeContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkMode = createContext<DarkModeContextType | undefined>(undefined)

export function useDarkMode() {
    const darkMode = useContext(DarkMode)

    if (darkMode === undefined) {
        throw new Error("useDarkMode must be used with a DarkModeContext")
    }

    return darkMode;

}