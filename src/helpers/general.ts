import { navigationRef } from "../store/globalRefs";

export const setThemeNavigation = (theme: 'light' | 'default' | 'dark') => {
    const { classList } = navigationRef.current!;

    classList.remove('light', 'default', 'dark');
    classList.add(theme);
}