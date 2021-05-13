import styles from "../Head/head.module.css"
import Link from 'next/link'

export default function head1() {
    return (
        
        <div className={styles.head}>
            <div className={styles.header}>
                <img src="/xin.png" className={styles.img1}/>
                <img src="/zi.png" className={styles.img2}></img>
                <Link href='https://so.toutiao.com/?need_open_window=1'>
                <a>
                    <img src="/sousuo.jpg" className={styles.img3}></img>
                </a>
                </Link>
                
            </div>
        <div className={styles.navbar}>
        <ul className={styles.nav}>
                <a className={styles.first}>推荐&nbsp;</a>
                <a className={styles.a}>视频&nbsp;</a>
                <a className={styles.a}>热点&nbsp;</a>
                <a className={styles.a}>社会&nbsp;</a>
                <a className={styles.a}>娱乐&nbsp;</a>
                <a className={styles.a}>军事&nbsp;</a>
                <a className={styles.a}>科技&nbsp;</a>
                <a className={styles.a}>汽车&nbsp;</a>
                <a className={styles.a}>房产&nbsp;</a>
                <a className={styles.a}>家居&nbsp;</a>
                
            </ul>
            

        </div>
        </div>
    )
}