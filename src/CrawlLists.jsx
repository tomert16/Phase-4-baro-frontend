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
        <div className="crawllist-page">
            <h1>Here is a list of created crawls</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>
            {/* show each individual crawl */}
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

//function to show an individual crawl
function BarCrawl({crawl, barArray}){   

    //state to toggle showing the review popup
    const [toggleReviews,  setToggleReviews] = useState(false);

    //turn the string of bar ids into an array of bars in the crawl
    let barCrawlIDArray = crawl.bar_crawl_bars_id.split(',').map(Number)
    let barCrawlArray = []
    let barCrawlDummy = null
    barCrawlIDArray.map((id)=>{
        barCrawlDummy = barArray.filter((bar) =>{
            return bar.id === id
        })
        barCrawlArray.push(barCrawlDummy)
    })

    //flip the state of the review toggle
    const handleToggle = () => {
        setToggleReviews(!toggleReviews);
    }
    

    return(
        <div>
            <div className="crawl-name">{crawl.bar_crawl_name}</div>
            <div>Created by: {crawl.username}</div>
            <div>Bars in this Crawl:</div>
            {/* show the indvidial bars in this crawl */}
            <div className="bar-crawl">
                {barCrawlArray.map((bar) => {
                    return(
                        <CrawlBar bar={bar}/>
                    )
                })}
                <br></br>
            </div>
            {/* toggle showing the reivew popup */}
            <button 
                className="bar-crawl-review-button"
                onClick={handleToggle}
            > View Crawl Reviews
            </button>
            { toggleReviews ? 
            // what the review popup looks like
                <div className="form-popup">
                    <div className="form-div">
                        <h1>{crawl.bar_crawl_name} Reviews</h1>
                        {/* if we have no reviews tell the user that */}
                        {crawl.bar_crawl_reviews.length === 0 ? <div> No Reviews Yet</div> : null}
                        {/* show each review */}
                        {crawl.bar_crawl_reviews.map((review) => {
                            return(
                                <CrawlReview review={review}/>
                            )
                        })}
                        <button className="exit-form" onClick={handleToggle}> Hide Reviews</button>
                    </div>
                </div> 
                : 
                null
            }
        </div>
    )
}

//function to show an individual bar in a crawl
function CrawlBar({bar}){
    return(
        <div>
            <div className="crawl-bar"> {bar[0].name} </div>   
            <img className="crawllist-img" src={bar[0].image} alt={bar[0].name}/>         
        </div>
    )
}

//function to show an individual review
function CrawlReview({review}){
    return(
        <div>
            <div> {review.username} </div>
            <div> {review.star_rating}/5</div>
            <div> {review.content} </div> 
            <br></br>  
        </div>
    )
}

