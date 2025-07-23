import { createSignal } from "solid-js";
import Sidebar from "./components/Sidebar";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  return (
      <div class="flex">
        <Sidebar />
        <div class="flex-1 bg-[#FFF8] h-[100vh]">
            <h1>Hello World</h1>
        </div>
      </div>
  );
}

export default App;
