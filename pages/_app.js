import '../styles/globals.css'
import {ThemeProvider} from "@f-ui/core";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={"dark"} styles={{height: "100vh", width: "100%"}} className={"wrapper"}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
