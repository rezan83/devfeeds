import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <RecoilRoot>
            <Navbar />
            <Home />
        </RecoilRoot>
    );
}

export default App;
