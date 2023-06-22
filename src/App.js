import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/shelf" component={BookShelves} />
    <Route exact path="/books/:id" component={BookDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
