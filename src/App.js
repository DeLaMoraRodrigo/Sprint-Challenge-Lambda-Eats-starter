import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePageDiv from "./components/HomePageDiv";
import PizzaForm from "./components/PizzaForm";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <Navigation />
        <HomePageDiv />
      </Route>

      <Route exact path="/pizza">
        <Navigation />
        <PizzaForm />
      </Route>

      <Route exact path="/cart">
        <Navigation />
        <Cart />
      </Route>
    </div>
  );
};
export default App;
