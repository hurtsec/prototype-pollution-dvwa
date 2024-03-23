import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const MainComponent = () => {
    const [user, setUser] = useState()
    
    useEffect(() => {
      axios.get('http://localhost:5001/user')
        .then(res => setUser(res.data))
        .catch(error => console.error(error))
    }, [])

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
          {(user && user.admin) && <p class="flag">FLAG:f10c4$7c1i3n7pr0707yp3p011u7i0n</p>}
        </section>
      </div>
    );
  }

  return (<MainComponent />)
}

export default App;
