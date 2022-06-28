import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css" // <-- DO NOT FORGET THIS!
import CustomNavbar from "./components/CustomNavbar"
import Home from "./components/Home"

function App() {
  return (
    <>
      <CustomNavbar title="Epic Restaurant" /> <Home />
    </>
  )
}

export default App
