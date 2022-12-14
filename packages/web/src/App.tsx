import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { testNumber } from "@react-monorepo/shared/test";
import { useGetSetByIdLegoQuery } from "@react-monorepo/shared/redux/services/rebrickable/rebrickable.web";

function App() {
  const { data, error } = useGetSetByIdLegoQuery("31120-1");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>And our test number is: {testNumber}</p>
        <p>And our set number is: {data?.name}</p>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
