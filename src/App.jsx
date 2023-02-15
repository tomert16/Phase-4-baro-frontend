import { useState, useEffect } from "react";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from "./LoginPage"
import NewUser from "./NewUser"
import Home from "./Home";
import About from "./About";
import BarInfo from "./BarInfo";
import Account from "./Account";
// import NewCrawl from "./NewCrawl";
import CrawlList from "./CrawlLists";


function App() {

  //global states that sibiling compnenets may need to access
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [clickedBar, setClickedBar] = useState()
  const [barCrawlData,  setBarCrawlData] = useState() 

  // useEffect for auto-login
  useEffect(() => {
    fetch("http://localhost:3000/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setLoggedInUser(user));
      }
    });
  },[]);


  //all the routes
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div><h1>404 NOT FOUND</h1></div>
    },
    {
      path:"/",
      element: <LoginPage
        setLoggedInUser={setLoggedInUser}
      />
    },
    {
      path: "/newuser",
      element: <NewUser 
        loggedInUser={loggedInUser} 
        setLoggedInUser={setLoggedInUser}
      />
    },
    {
      path: "/home",
      element: <Home
        setClickedBar={setClickedBar}
        setBarCrawlData={setBarCrawlData}
        setLoggedInUser={setLoggedInUser}
        loggedInUser={loggedInUser}
      />
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path:"/barinfo",
      element: <BarInfo
        clickedBar={clickedBar}
        loggedInUser={loggedInUser}
      />
    },
    {
      path: "/account",
      element: <Account
        loggedInUser={loggedInUser}
      />
    },
    // {
    //   path: "/newcrawl",
    //   element: <NewCrawl
    //     barCrawlData={barCrawlData}
    //   />
    // },
    {
      path: "/crawllist",
      element: <CrawlList/>
    }
  ])
  return (


    <div >
        <head>
          <title>Baro</title>
        </head>
      <RouterProvider router={router}/>      
    </div>
  )
}

export default App
