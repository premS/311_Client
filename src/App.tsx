import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Table } from './Table';
import { RequestTypeChart } from './RequestTypeChart';
import { TrendChart } from './TrendChart';

import './App.css';

interface TrendData {
  total: number;
  year: number;
  month: number;
}

interface TypeData {
  total: number;
  type: string;
}

function App() {
  const [trend, setTrend] = useState([] as TrendData[]);
  const [neighborhood, setNeighborhood] = useState([] as TypeData[]);
  const [requesttype, setRequestType] = useState([] as TypeData[]);
  const [caseData, setCaseData] = useState([{}] as any);
  const [columnDefs, setcolumnDefs] = useState([{}] as any);
  const [selectedFilter, setselectedFilter] = useState('');

  const data: {Period: string, TotalCases: number}[] = [];
  const requesttypeData: {RequestType: string, TotalCount: number}[] = [];

  function filterValues () {
    return (
    <div style={{width: "500px", display: "flex", padding: "24px"}}>
      <label>Filter by Neighborhood:</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <select value={selectedFilter} onChange={e=>setselectedFilter(e.target.value)}>
       {optionss}
      </select>
    </div>
    )
  }
  /**
   * Get column names and neighborhood names
   */
  useEffect(()=>{

    axios.get('http://localhost:3000/neighborhood')
    .then(function (response) {
      // handle success
      const {data} = response;
      if(data){
        setNeighborhood(data);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  axios.get('http://localhost:3000/describe')
    .then(function (response) {
      // handle success
      const {data} = response;
      if(data){
        let values: {}[] = [];
        data.forEach((value: {column_name: string}) => {
          values.push({ field: value["column_name"]});
        });
        setcolumnDefs(values);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }, []);

  /**
   * Get case trend chart and request type totals chart based on neighborhood name as needed
   */
  useEffect(()=>{
    let query = '';
      query = '?neighborhood=' + selectedFilter;
      axios.get('http://localhost:3000/casetrend'+query)
      .then(function (response) {
        // handle success
        const {data} = response;
        if(data){
          setTrend(data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  
      axios.get('http://localhost:3000/requesttype'+query)
      .then(function (response) {
        // handle success
        const {data} = response;
        if(data){
          setRequestType(data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      axios.get('http://localhost:3000/data'+query)
      .then(function (response) {
        // handle success
        const {data} = response;
        if(data){
          setCaseData(data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [selectedFilter]);

  trend.forEach(tdata => {
   const {total, year, month} = tdata;
   data.push({
    Period: year + '-' + month,
    TotalCases: total
   });
  });

  const optionss: React.ReactElement[] = [];

  neighborhood.forEach(data =>{
    optionss.push(<option key={data.type} value={data.type}>{data.type}</option>);
  })

  requesttype.forEach(data => {
    requesttypeData.push({RequestType: data.type, TotalCount: data.total});
  })

  return (
    <div className="App">
      {filterValues()}
      <br/><br/>
      <div style={{width: "90vw", display: "flex", height: "50vh"}}>
        <TrendChart data={data}/>
        <RequestTypeChart requesttypeData={requesttypeData}/>
      </div>
      <Table columnDefs={columnDefs} rowData={caseData}/>
    </div>
  );
}

export default App;
