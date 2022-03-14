import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useEffect } from 'react';
import LandingPage from "./components/Landing";
import ServicePage from "./components/Services";

const App = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/scheduler">
            <ServicePage />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
