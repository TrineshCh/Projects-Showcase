import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import './App.css'

// Static Data
const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home categoriesList={categoriesList} />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default App
