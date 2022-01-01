import React from 'react';
import "./Widgets.css"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, useEffect } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const data = [
    {
       "author":"Aria Alamalhodaei",
       "title":"Tesla will only use iron-based batteries for standard model EVs",
       "description":"Tesla said Wednesday it will use iron-based batteries for its standard Model 3 and Model Y models across global markets. The update, provided in the company\u0026#8217;s third-quarter earnings report, confirmed hints that Tesla CEO Elon Musk has been dropping for months about the cheaper battery chemistry\u0026#8217;s growing role in the company\u0026#8217;s product line-up. Lithium-iron-phosphate (LFP) [\u0026#8230;]",
       "url":"https:\/\/techcrunch.com\/2021\/10\/20\/tesla-earnings-iron-batteries-evs-globally\/",
       "source":"TechCrunch",
       "image":null,
       "category":"technology",
       "language":"en",
       "country":"us",
       "published_at":"2021-10-20T22:55:23+00:00"
    },
    {
       "author":"Rebecca Bellan",
       "title":"Tesla has 150,000 cars using its safety score tool",
       "description":"Nearly 150,000 Tesla cars are using the company\u0026#8217;s new \u0026#8220;safety score,\u0026#8221; a tool rolled out last month\u00a0to determine whether owners can access the beta version of its\u00a0\u201cFull Self-Driving\u201d software, executives said during\u00a0its third quarter earnings call. While 150,000 cars are now part of the Full-Self Driving (FSD) beta enrollment program, a fraction of drivers have [\u0026#8230;]",
       "url":"https:\/\/techcrunch.com\/2021\/10\/20\/tesla-third-quarter-earnings-safety-score\/",
       "source":"TechCrunch",
       "image":null,
       "category":"technology",
       "language":"en",
       "country":"us",
       "published_at":"2021-10-21T00:43:57+00:00"
    },
    {
       "author":"Romain Dillet",
       "title":"Customer engagement platform Batch raises $23 million after years of bootstrapping",
       "description":"If you\u2019ve been working in the French tech ecosystem, you may remember a startup called AppGratis. The app discovery and promotion startup basically had to stop operating overnight following a long and nasty fight with Apple. From the team that brought you AppGratis, Batch is a customer engagement platform that has been operating under the [\u0026#8230;]",
       "url":"https:\/\/techcrunch.com\/2021\/10\/20\/customer-engagement-platform-batch-raises-23-million-after-years-of-bootstrapping\/",
       "source":"TechCrunch",
       "image":null,
       "category":"technology",
       "language":"en",
       "country":"us",
       "published_at":"2021-10-21T04:00:13+00:00"
    },
    {
       "author":"Mike Butcher",
       "title":"Meal planner startup Kitchenful raises $1.9M from VentureFriends, Goodwater Capital, and Jabbar",
       "description":"With the pandemic turning us into delivery experts, consumers have also switched on to meal-kits on droves, given that it combines both delivery and home cooking. But many meal kits can be inflexible. The Kitchenful startup in Germany realized this and so it allows users to browse recipes from food bloggers and have personalized meal [\u0026#8230;]",
       "url":"https:\/\/techcrunch.com\/2021\/10\/21\/meal-planner-startup-kitchenful-raises-1-9m-from-venturefriends-goodwater-capital-and-jabbar\/",
       "source":"TechCrunch",
       "image":null,
       "category":"technology",
       "language":"en",
       "country":"us",
       "published_at":"2021-10-21T07:01:20+00:00"
    },
    {
       "author":"Mike Butcher",
       "title":"Watch Edward Snowden launch Global Encryption Day, live today",
       "description":"Marginalized communities, survivors of abuse, politicians, law enforcement \u0026#8211; they all use encrypted communications to keep their information safe. But the encryption of the kinds of services you and I use every day \u0026#8211; from messaging to confidential internal company communications \u0026#8211; is increasingly under threat by governments globally. The reasons are sometimes understandable, such [\u0026#8230;]",
       "url":"https:\/\/techcrunch.com\/2021\/10\/21\/watch-edward-snowden-launch-global-encryption-day-live-today\/",
       "source":"TechCrunch",
       "image":null,
       "category":"technology",
       "language":"en",
       "country":"us",
       "published_at":"2021-10-21T10:18:50+00:00"
    }
 ]

function Widgets() {

    const [latestNews , setLatestNews]= useState(data)
    
  
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