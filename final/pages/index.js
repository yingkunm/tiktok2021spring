import React, { useEffect, useState } from "react";
import fetch from 'isomorphic-unfetch'
import styles from '../styles/Home.module.css'
import Head1 from '../components/Head/head1'
import Footer from '../components/Footer/footer'
import Link from 'next/link'
import Head from 'next/head'
import Feed from '../components/feed/feed'
function Home(props){
    
    return(
  
    <div className={styles.container}>
    <Head>
        <title>今日头条 - TouTiao.com</title>
    </Head>
    <Head1/>
    <Footer/>
    <div className={styles.news_container}>
        {props.feedList.map((i) => {
            if(i.mode==="top"){
                return (
                    
                    <div className={styles.singlecontainer} >
                    <Link href='/secondpage'>
                    <a>
                         <div className={styles.single}>
                            <h2 className={styles.h}>{i.title}</h2>
                            <div className={styles.footbar}>
                                <span className={styles.set_top}>&nbsp;置顶&nbsp;</span>
                                <a>&nbsp;{i.media}</a>
                                <a>&nbsp;评论&nbsp;{i.recommend}</a>
                                <a>&nbsp;{i.time}</a>
                            </div>
                        </div>
                    </a>
                       
                    </Link>
                        
                    </div>
                ); 
            }else if(i.mode==="single"){
                    return(
                        <div className={styles.singlecontainer}>
                        <Link href='/secondpage'>
                        <a>
                            <div className={styles.single}>
                            <h2 className={styles.h}>{i.title}</h2>
                            <div className={styles.footbar}>
                                <a>&nbsp;{i.media}</a>
                                <a>&nbsp;评论&nbsp;{i.recommend}</a>
                                <a>&nbsp;{i.time}</a>
                            </div>
                        </div>
                        </a>
                            
                        </Link>
                        
                    </div>
                    );
                                                
            }else if(i.mode==="words&pic"){
                return (
                    <>
                    <Link href='/secondpage'>
                    <a>
                        <div className={styles.wandpcontainer}>
                        <div className={styles.left}>
                            
                            <h2 className={styles.h}>{i.title}</h2>
                                <div className={styles.footbar}>
                                <a>&nbsp;{i.media}</a>
                                <a>&nbsp;评论&nbsp;{i.recommend}</a>
                                <a>&nbsp;{i.time}</a>
                                </div>
                        
                        </div>
                        
                            <img src={i.img} className={styles.rightimg} />
                        
                    </div>
                    </a>
                        
                    </Link>
                    </>
                    
                );
            }else if(i.mode==="three_pic"){
                return(
                    <>
                    <Link href='/secondpage'>
                    <a>
                        <div className={styles.threepiccontainer}>
                        <h2 className={styles.h}>{i.title}</h2>
                        <ul className={styles.pics}>
                            <img src={i.img[0]} className={styles.threepic}/>
                            <img src={i.img[1]} className={styles.threepic}/>
                            <img src={i.img[2]} className={styles.threepic}/>
                        </ul>
                        <div className={styles.footbar}>
                                <a>&nbsp;{i.media}</a>
                                <a>&nbsp;评论&nbsp;{i.recommend}</a>
                                <a>&nbsp;{i.time}</a>
                        </div>
                    </div>
                    </a>
                        
                    </Link>
                    </>
                    
                );
            }else if(i.mode==="big_pic"){
                return(
                    <div className={styles.bigpiccontainer}>
                    <Link href='/secondpage'>
                    <a>
                        <h2 className={styles.h}>{i.title}</h2>
                        <img src={i.img} className={styles.big_pic}/>
                        <div className={styles.footbar}>
                                <span className={styles.set_big}>&nbsp;广告&nbsp;</span>
                                <a>&nbsp;{i.media}</a>
                                <a>&nbsp;评论&nbsp;{i.recommend}</a>
                                <a>&nbsp;{i.time}</a>
                        </div>
                    </a>
                        
                    </Link>
                        
                    </div>
                );
            }
        })}
        
        </div>
        <Feed/>
    </div>
  )}

  Home.getInitialProps= async function () {
    let res= await fetch ('http://localhost:3000/news.json');
    let data= await res.json();
    console.log(data);
    return{feedList:data};
}

export default Home;
