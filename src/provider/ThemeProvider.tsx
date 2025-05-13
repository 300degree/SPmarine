import { ReactNode, createContext, useState } from 'react';

type Theme_t = 'light' | 'dark';

type ThemeContext_t = {
	theme: Theme_t;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContext_t>({
	theme: 'light',
	toggleTheme: (): void => {},
});

function getPreFerredTheme(): Theme_t {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme_t>(getPreFerredTheme);
	console.log(getPreFerredTheme());

	const toggleTheme = () => {
		setTheme((p) => (p === 'light' ? 'dark' : 'light'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeProvider, ThemeContext };
