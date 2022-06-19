import React from 'react'
import { HashRouter, HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignUpPage } from './pages/SignUpPage.jsx'


const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUpPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </HashRouter>
    </div>
  )
  }
export default App
