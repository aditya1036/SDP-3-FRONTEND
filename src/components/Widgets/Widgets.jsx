import React from 'react';
import "./Widgets.css"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>

            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>Job Interests</h2>
                <InfoOutlinedIcon />
            </div>
            {newsArticle("Elon Musk is now the richest person in the world", "Top news - 4296 readers")}

            <img src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg" alt="ad"/>
        </div>
    )
}

export default Widgets