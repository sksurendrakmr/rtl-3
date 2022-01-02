import React from "react";
import { Cards } from "./components/Cards/Cards";
import cats from "./mocks/cats.json";

const App = () => {
  return (
    <div>
      <Cards cats={cats} />
    </div>
  );
};

export default App;
