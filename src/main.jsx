import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // App includes RoadRisk
import "./index.css";
import RoadRisk from "./RoadRisk";
import WeatherDetails from "./components/WeatherDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoadRisk />  
    <WeatherDetails/>
  </React.StrictMode>
);





























// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App"; // App uses RoadRisk inside
// import "./index.css";
// import RoadRisk from "./RoadRisk";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RoadRisk />
//   </React.StrictMode>
// );



