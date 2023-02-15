import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {SlArrowRight} from 'react-icons/sl'
import logo1 from './assets/cropped-logo1.png'

export default function CrawlList() {
    const navigate = useNavigate()
    const [crawlArray, setCrawlArray] = useState([])
    const [barArray, setBarArray] = useState([])

        

    //fetch the array of all the crawls
    useEffect(() => {
        const fetchCrawls = async () => {
            const req = await fetch('http://localhost:3000/bar_crawls')
            const res = await req.json()
            setCrawlArray(res)
        }

        const fetchBars = async () => {
            const req = await fetch('http://localhost:3000/bars')
            const res = await req.json()
            setBarArray(res)        
        }

        fetchCrawls()
        fetchBars()
    }, []) 
    //halts the code untill we finish fetching 
    if (!crawlArray[0]) return null
    if (!barArray[0]) return null


    //function to log out by setting the state of the logged in user to undefined
     //and navigating back to the login page
    function logOut(){
        // setLoggedInUser(undefined)
        // navigate('/')
        fetch("http://localhost:3000/logout", {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                setLoggedInUser(null)
                navigate('/')
            }
        })
     }
    
    return(
        <div className="crawllist-page">
            <div className="header-div">
                <img className="header-logo" src={logo1} onClick={() => navigate('/home')}/>
                <div className="nav-bar">
                    <button type="button" onClick={() => navigate('/about')}> About</button>
                    <button type="button" onClick={() => navigate('/crawllist')}> View All Crawls</button>
                    <button type="button" onClick={() => navigate('/account')}> Account Info</button>
                    <button type="button" onClick={logOut}> Exit</button>
                </div>
            </div>
            <img className="crawllist-image" src="src/assets/another-bar-photo.jpg" />
            <h1 className="crawllist-page-title">Browse Existing Bar Crawls</h1>

            <div className="crawllist-container">
                {crawlArray.map((crawl) => {
                    return(
                        <BarCrawl
                            key={crawl.id}
                            crawl={crawl}
                            barArray={barArray}
                        />
                    )
                })}
            </div>
        </div>
    )
}


function BarCrawl({crawl, barArray}){   

    let barCrawlIDArray = crawl.bar_crawl_bars_id.split(',').map(Number)
        
    let barCrawlArray = []
    let barCrawlDummy = null
    
    barCrawlIDArray.map((id)=>{
        barCrawlDummy = barArray.filter((bar) =>{
            return bar.id === id
        })
        barCrawlArray.push(barCrawlDummy)
    })
    


    return(
        <div>
            <div className="crawl-name">{crawl.bar_crawl_name}</div>
            <div className="crawl-subtitle">Created by: {crawl.username}</div>
            <div className="crawl-subtitle">Bars in this Crawl:</div>
        <div className="bar-crawl">
            {barCrawlArray.map((bar) => {
                return(
                    <CrawlBar bar={bar}/>
                )
            })}
            <br></br>
        </div>

        </div>
    )
}

function CrawlBar({bar}){
    return(
        <div>
            <div className="crawl-bar"> {bar[0].name} </div>   
            <img className="crawllist-img" src={bar[0].image} alt={bar[0].name}/>
            <h1 className="crawl-arrow"> {<SlArrowRight />} </h1>
        </div>
    )
}