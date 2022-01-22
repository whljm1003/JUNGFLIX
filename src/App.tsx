import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/HeaderCompo";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Router>
        <Header />
        <Switch>
          <Route path={["/search", "/search/moives/:searchId"]}>
            <Search />
          </Route>
          <Route path={["/tv", "/tv/:tvId"]}>
            <Tv />
          </Route>
          {/* path => []  2개의 path 필요할 때 사용 */}
          <Route path={["/", "/movies/:movieId"]}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
