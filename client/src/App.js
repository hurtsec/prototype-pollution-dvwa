import {useState, useEffect} from 'react'
import {BrowserRouter as Router, useSearchParams} from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'
import './App.css'

function App() {
  const MainComponent = () => {
    const [user, setUser] = useState()
    const [searchParams] = useSearchParams()
    
    useEffect(() => {
      axios.get('http://localhost:5001/user')
        .then(res => setUser(res.data))
        .catch(error => console.error(error))
    }, [])

    if (user && searchParams.get('userSettings')) {
      // Vulnerable code allowing for attacker to pass in a crafted object
      // and pollute the JavaScript Object Prototype with additional properties
      // causing all objects to contain the polluted property.
      // Example Payload: http://localhost:3000/?userSettings={"__proto__":{"admin":1}}
      _.merge({}, JSON.parse(searchParams.get('userSettings')))
    }

    return (
      <div className="App">
        <header className="App-header">
          <section className="logo">
            <h1>Prototype Pollution DVWA</h1>
          </section>
          <nav className="menu">
            <a href="#">Home</a>
            <a href="#">Settings</a>
          </nav>
        </header>
        <section className="app-body">
          {/* Information disclosure occurs when attacker pollutes the JavaScript Object Prototype
              with an `admin` property, triggering this conditional element to be revealed. */}
          {(user && user.admin) && <p className="flag">FLAG:f10c4$7c1i3n7pr0707yp3p011u7i0n</p>}
        </section>
      </div>
    );
  }

  return (
    <Router>
      <MainComponent />
    </Router>
  )
}

export default App;
