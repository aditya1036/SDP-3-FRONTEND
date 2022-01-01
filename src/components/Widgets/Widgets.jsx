import React from 'react';
import "./Widgets.css"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, useEffect } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


function Widgets() {

    const [latestNews , setLatestNews]= useState([])
    
    
    useEffect(() => {

        async function fetchNews()
        {
            const res  = await fetch('http://api.mediastack.com/v1/news?access_key=dba5e96ff92ce740e85f2e61011e27da&categories=technology&languages=en', {
                method: "GET",
                
            })

            const new_data = await res.json()
            setLatestNews(new_data.data)
        }

        fetchNews()
    },[])
    const newsArticle = (heading, subtitle,author) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>

            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
                <p>{author}</p>
            </div>
        </div>
    );

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>Tech Interests</h2>
                <InfoOutlinedIcon />
            </div>
            {latestNews && latestNews.slice(0,5).map((news) => (
                <>
                {news.author === null?
                    (newsArticle(`${news.title}`,"Published At: "+new Date(`${news.publishedAt}`).toUTCString(),"Author: Not Available")):
                    (newsArticle(`${news.title}`,"Published At: "+new Date(`${news.publishedAt}`).toUTCString(),"Author: "+`${news.author}`))
                }
                 
                </>
            ))}
           
        </div>
    )
}

export default Widgets