import { ThemeProvider } from "@/components/theme-provider"
import Nav from "./components/Nav";
import { ModeToggle } from "./components/mode-toggle";


function App() {

    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <ModeToggle/>
                <Nav/>
            </ThemeProvider>
        </>
    );
}

export default App;
