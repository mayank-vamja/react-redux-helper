import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./screens/Home"
import store from "./store"

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <header>
        Add your navbar code here if you want common navbar.
      </header> */}

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
)

export default App
