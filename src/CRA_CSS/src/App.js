import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./screens/Home"

const App = () => (
  <Router>
    {/* <header>
        Add your navbar code here if you want common navbar.
      </header> */}

    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
)

export default App
