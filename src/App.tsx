import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'

//Task 1:  Pull the data from this API and log it to the console.
//Task 2. Print the JSON to the screen. And add a button, which allows you to refresh the
//fetched data.
//Task 3. Now I'd like to assess your ability to turn this JSON data into something usable.
// Take the Users' name, email, username and password and display the data in a table.
//Task 4. Just a quick test on your ability to handle images. Add another column which
// displays the medium-sized image of the user.
interface Result {
  cell: string;
  dob: any;
  email: string;
  gender: string;
  id: any;
  location: any;
  login: {md5: string, password: string, salt: string, sha1: string, sha256: string, username: string, uuid: string};
  name: { title: string, first: string, last: string };
  nat: string;
  phone: string;
  picture: any;
  registered: any;
}
interface Response {
  info?: {seed: string, results: number, page: number, version: string};
  results?: Result[]
}

const defaultResponse: Response = {}
function App() {
  const [response, setResponse]: [Response, (res: Response) => void | Response] = useState(defaultResponse)
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get("https://randomuser.me/api/?results=20").then(response => {
      console.log(response.data)
      setResponse(response.data)
    }).catch(console.log)
  }
  return (
      <div className="container">
        {/*<pre>{JSON.stringify(response, null, 2)}</pre>*/}
        <button onClick={getData} className="refresh-botton">refresh</button>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Medium (Image)</th>
          </tr>
          </thead>
          <tbody>
          {response.results?.map((res: Result) => {
            return (
                <tr>
                  <td>{`${res.name.title} ${res.name.first} ${res.name.last}`}</td>
                  <td>{res.email}</td>
                  <td>{res.login.username}</td>
                  <td>{res.login.password}</td>
                  <td><img src={res.picture.medium} alt={`${res.name.title} ${res.name.first} ${res.name.last}`}/></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
  );
}

export default App;
