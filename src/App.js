import logo from './logo.svg';
import './App.css';
import Country from './components/CountrySelector/country';
import Highlight from './components/Highlight/highlight';
import Summary from './components/Summary/summary';
import { useEffect, useState } from 'react';
import { getContries, getReportByCountry } from './components/api/index'


function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getContries()
      .then(res => {
        setCountries(res.data);
        setSelectedCountryId('vn');
      })
      .catch(err => console.log(err))
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  }

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId)
      getReportByCountry(Slug)
        .then((res) => {
          res.data.pop();
          setReport(res.data);
        });
    }
  }, [countries, selectedCountryId])

  return (
    <div className="App">
      <Country countries={countries} handleOnChange={handleOnChange} value={selectedCountryId}/>
      <Highlight report={report} />
      <Summary report={report}  selectedCountryId={selectedCountryId}/>
    </div>
  );
}

export default App;
