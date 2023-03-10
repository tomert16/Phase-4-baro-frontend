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
            <div className="crawl-subtitle">Created by: {crawl.username}</div>
            {/* <div className="crawl-subtitle">Bars in this Crawl:</div> */}
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
                        <div className="crawl-reviews">

                        <h3>{crawl.bar_crawl_name} Reviews</h3>
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
            <h1 className="crawl-arrow"> {<SlArrowRight />} </h1>
        </div>
    )
}

//function to show an individual review
function CrawlReview({review}){
    return(
        <div className="crawl-review-details">
            <div className="review-username"> {review.username} </div>
            <div className="review-detail"> {review.star_rating}/5</div>
            <div className="review-detail"> {review.content} </div> 
            <br></br>  
        </div>
    )
}

