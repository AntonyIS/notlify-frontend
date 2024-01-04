import React ,{FC,useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { GetArticles } from '../../http/api';
import { ArticleEntity } from '../../../core/domain';
import { ArticleList } from './ArticleList';
import { ContentRecommendations } from './ArticleRecommendations';
import {  ResponsePage } from '../ResponsePages/ResponsePage';
import { AddNewArticle } from './AddNewArticle';

const roundButton = {
    borderRadius: "60px"
}

const linkStyle = {
    textDecoration: 'none',
    borderRadius : '30%'
 };

export  const ArticleHome:FC = () => {
    // Pull Articles from the articles service
    const [articles, setArticles] = useState<ArticleEntity[]>([])
    // Define error messages
    const [error, setError] = useState("");
    // Fetch Data from the Article Service
    useEffect(() => {
        const fetchData = async () => {
          try {
            const articlesData = await GetArticles();
            if ('error' in articlesData) {
                setError(`Internal server error ${articlesData.error}`);
            } else if(articlesData.length == 0 ){
                setError(`Articles not available!`);
            }else{
                setArticles(articlesData);  
            }
          } catch (error) {
            setError(`Internal server error`);
          }
        };
        fetchData();
    }, []); 
    
  
    return (
        <>  
        <div className="container">
            {error && 
                <ResponsePage message={error} statusCode={"500"}/>
            }
            <div className='row'>
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <div className="card mb-2 text-bg-light p-3" style={{border: "none"}}>
                        <div className="card-body">
                            <h6 className='fw-light'>Draft an Article ?</h6>
                            <Link to={`/articles/draft`} style={linkStyle}>
                                <button className="btn btn-info fw-light" style={roundButton}>Draft</button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    
                </div>
            </div>
            <div className='row'>
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <ArticleList articles={articles} />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <ContentRecommendations articles={articles} />
                </div>
            </div>
        </div>
        </>
    )
}