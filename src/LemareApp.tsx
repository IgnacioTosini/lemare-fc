import { AppRouter } from "./routes/AppRouter";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

export const LemareApp = () => {
    return (
        <>
            <Header />
            <AppRouter />
            <Footer />
        </>
    );
}
