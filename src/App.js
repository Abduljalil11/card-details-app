import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Card from './components/Card';
import Form from './components/Form';
import Attribution from './components/Attribution';
import Complete from './components/Complete';

function App() {

  const [data, setData] = useState({
    name:"",
    number:"",
    month:"",
    year:"",
    cvc:""
  })

  return (
    <Router>
      <article>
        <main>
          <Card data={data} />
          <Routes>
            <Route exact path='/' element={<Form data={data} setData={setData} />} />
            <Route path='/Complete' element={<Complete/>} />
          </Routes>
        </main>
        <Attribution />
      </article>
    </Router>
  );
}

export default App;
