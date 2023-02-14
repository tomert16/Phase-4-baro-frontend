import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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


    
    return(
        <div>
            <h1>Here is a list of created crawls</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>

            <div className="bar-crawl-container">
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
        <div className="bar-crawl">
            <div className="crawl-name">{crawl.bar_crawl_name}</div>
            <div>Created by: {crawl.username}</div>
            <div>Bars in this Crawl:</div>
            {barCrawlArray.map((bar) => {
                return(
                    <CrawlBar bar={bar}/>
                )
            })}
            <br></br>
        </div>
    )
}

function CrawlBar({bar}){
    return(
        <div>
            <div className="crawl-bar"> {bar[0].name} </div>   
            <img src={bar[0].image} alt={bar[0].name}/>         
        </div>
    )
}