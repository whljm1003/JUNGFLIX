import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/HeaderCompo";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
            integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
            crossOrigin="anonymous"
          />
        </Helmet>
      </HelmetProvider>
      <Router>
        <Header />
        <Routes>
          <Route path={"/search"} element={<Search />}>
            <Route path={"/search/moives/:searchId"} element={<Search />} />
          </Route>
          <Route path={"/tv"} element={<Tv />}>
            <Route path={"/tv/:tvId"} element={<Tv />} />
          </Route>
          <Route path={"/"} element={<Home />}>
            <Route path={"/movies/:movieId"} element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
