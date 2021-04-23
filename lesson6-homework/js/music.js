function screenWH(){
    let offsetWid = document.documentElement.clientWidth;
    let offsetHei = document.documentElement.clientHeight;
    if (/(Android)/i.test(navigator.userAgent)){     // 判断是否为Android手机
        offsetWid = screen.width;
        offsetHei = screen.height;
    }else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){  // 判断是否为苹果手机
        offsetWid=document.documentElement.clientWidth;
        offsetHei=document.documentElement.clientHeight;
    }
    document.getElementsByTagName("body")[0].style.width=offsetWid+"px";
    document.getElementsByTagName("body")[0].style.height=offsetHei+"px";
};

(function(){
    screenWH();
    let $=function(str){
    // 根据空格分割成数组
    let ary=str.split(' ');
    let dom=document;

    // 查询class，tag的为时候数组
    function queryChildren(dom,num){
        let dom_ary=[];
        if(ary[num].indexOf('.')>=0){
            for(let i=0;i<dom.length;i++){
                dom_ary.push(dom[i].getElementsByClassName(ary[num].slice(1)));
            }
        }else{
            for(let i=0;i<dom.length;i++){
                dom_ary.push(dom[i].getElementsByTagName(ary[num]));
            }
        }
        if(num+1!=ary.length){
                let new_ary=[];
                for(let i=0;i<dom_ary.length;i++){
                    let val=dom_ary[i];
                    new_ary.push(queryChildren(val,num+1));
                    console.log(new_ary[i])
                }
                dom_ary=new_ary;
        }
            return dom_ary;
        }

        for(let i=0;i<ary.length;i++){
            if(dom.length){
                return dom=queryChildren(dom,i);
            }else{
                if(ary[i].indexOf('#')>=0){
                    dom=dom.getElementById (ary[i].slice(1));
                }else if(ary[i].indexOf('.')>=0){
                    dom=dom.getElementsByClassName (ary[i].slice(1));
                }else{
                    dom=dom.getElementsByTagName(ary[i]);
                }
            }
        }
        return dom;
    }
    
    let list=[
        {
            title:'Bye Bye Bye',
            artist:'Lovestoned',
            album:'Rising Love',
            img:'./img/1.gif',
            mp3:'http://www.ytmp3.cn/down/39165.mp3',
        },
        {
            title:'巴比伦',
            artist:'潘玮柏',
            album:'未知',
            img:'./img/2.gif',
            mp3:'http://m10.music.126.net/20210423142555/b03e1dddbe684251cd64f0736da06485/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3971498562/7445/41a3/4385/78242f7255ccd7bc9910c87e5a137d14.mp3',
        },
        {
            title:'就是爱你',
            artist:'陶喆',
            album:'太平盛世',
            img:'./img/3.gif',
            mp3:'http://www.ytmp3.cn/down/58088.mp3',
        },
        {
            title:'星辰大海',
            artist:'黄霄雲',
            album:'未知',
            img:'./img/4.gif',
            mp3:'http://www.ytmp3.cn/down/74079.mp3',
        },
        {
            title:'送你一朵小红花',
            artist:'赵英俊',
            album:'未知',
            img:'./img/5.gif',
            mp3:'http://www.ytmp3.cn/down/74191.mp3',
        }
    ];

    class Music{
        constructor(audio,location,voiceSize,processSize,playbackMode,isVoice,playlist){
            this.audio=audio; //播放标签
            this.location=location; //当前位置
            this.voiceSize=voiceSize; //声音大小
            this.processSize=processSize; //进度条大小           
            this.playbackMode=playbackMode; //播放模式:单曲(single)，顺序(sequence)，乱序(disorder)
            this.isVoice=isVoice; //静音
            this.playlist=playlist; //音乐列表
        }

        // 添加歌曲列表
        createPlayList(list=$("#playlist")){ 
            for(let i=0;i<this.playlist.length;i++){
                let item=this.playlist[i];
                list.innerHTML=list.innerHTML+('<li>'+item.artist+'-'+item.title+'</li>');
            }
        }

        //voiceControl() 静音图标变化
        voiceControl(
            {
                voiceIcon=$("#isVoice"), //声音图标所在位置
                voiceClass="icon-shengyin", //非静音class
                muteClass="icon-jingyin", //静音class
                voiceLoaded=$("#voiceLoaded") //声音进度条
            }={}
        ){
            if(this.isVoice||this.voiceSize==0){
                voiceIcon.classList.remove(voiceClass);
                voiceIcon.classList.add(muteClass);
                this.audio.volume=0;
            }else{
                voiceIcon.classList.remove(muteClass);
                voiceIcon.classList.add(voiceClass);
                this.audio.volume=this.voiceSize;
            }
            voiceLoaded.style.width=this.voiceSize*100+"%";
        }

        //change() 播放音乐样式变化改变
        change(
            {
                musicImg=$("#music-img"), //音乐图片
                title=$("#music .tag strong")[0][0], //音乐标题
                artist=$("#music .tag .artist")[0][0], //歌手
                album=$("#music .tag .album")[0][0], //专辑
                li=$("#playlist li"), //音乐列表
                palyingClass="playing", //正在播放的音乐列表样式
                voiceIcon=$("#isVoice"), //声音图标所在位置
                voiceClass="icon-shengyin", //非静音class
                muteClass="icon-jingyin", //静音class
                voiceLoaded=$("#voiceLoaded") //声音进度条
            }={}
        ){
            for(let i=0;i<this.playlist.length;i++){
                li[i].classList.remove(palyingClass);
            }
            this.audio.src=this.playlist[this.location].mp3;
            musicImg.src=this.playlist[this.location].img;
            title.innerText=this.playlist[this.location].title;
            artist.innerText=this.playlist[this.location].artist;
            album.innerText=this.playlist[this.location].album;
            li[this.location].classList.add(palyingClass);
            this.voiceControl();
        }

        //格式秒数
        format(_time)
        {
            return _time.toString().replace(/^(\d)$/, "0$1")	
        }
        
        //歌曲进度条自动绘制
        automaticPlotting(musicLoaded=$("#musicLoaded")){
            let time=setInterval(()=>{
                let duration=this.audio.duration;//歌曲总时长
                let currentTime=this.audio.currentTime;//歌曲播放当前时间
                musicLoaded.style.width=currentTime/duration*100+'%';//绘制进度条
                if(this.audio.ended){
                    clearInterval(time);
                }
            },10);
        }
        run(
            {   
                musicLoaded=$("#musicLoaded"), //音乐进度条
                _time=$("#time"), //音乐动态时间
                musicImg=$("#music-img"), //音乐图片
                title=$("#music .tag strong")[0][0], //音乐标题
                artist=$("#music .tag .artist")[0][0], //歌手
                album=$("#music .tag .album")[0][0], //专辑
                li=$("#playlist li"), //音乐列表
                palyingClass="playing", //正在播放的音乐列表样式
                voiceIcon=$("#isVoice"), //声音图标所在位置
                voiceClass="icon-shengyin", //非静音class
                muteClass="icon-jingyin", //静音class
                voiceLoaded=$("#voiceLoaded") //声音进度条
            }={}
        ){
            this.audio.play();
            this.automaticPlotting(musicLoaded);
            let time=setInterval(()=>{
                let cur=this.audio.currentTime;
                _time.innerText=this.format(parseInt(cur/60))+ ':' + this.format(parseInt(((cur-60*parseInt(cur/60)))));
                if(this.audio.ended){
                    clearInterval(time);
                    this.playOrder();
                    this.change();
                    this.run();
                }
            },10);
        }

        //播放顺序
        playOrder(){
            if(this.playbackMode=='single'){//单曲循环 

            }else if(this.playbackMode=='sequence'){//顺序播放
                if(this.location==this.playlist.length-1){
                    this.location=0;
                }else{
                    this.location++;
                }
            }else{//随机播放
                    this.location=parseInt(Math.random() * this.playlist.length);
            }
        }
        // eventBind()事件绑定
        eventBind(
            {
                voiceSlider=$("#voiceSlider"), //声音进度条外层
                voiceLoaded=$("#voiceLoaded"), //声音进度条
                voiceIcon=$("#isVoice"), //声音图标所在位置
                voiceClass="icon-shengyin", //非静音class
                muteClass="icon-jingyin", //静音class

                suspend=$("#suspend"), //播放/暂停键的位置
                playClass="icon-play", //播放class
                pauseClass="icon-zanting", //暂停class

                prev=$("#prev"), //上一首
                next=$("#next"), //下一首
                musicImg=$("#music-img"), //音乐图片
                title=$("#music .tag strong")[0][0], //音乐标题
                artist=$("#music .tag .artist")[0][0], //歌手
                album=$("#music .tag .album")[0][0], //专辑
                li=$("#playlist li"), //音乐列表
                palyingClass="playing", //正在播放的音乐列表样式


                musicSlider=$("#musicSlider"), //歌曲进度条外面
                musicLoaded=$("#musicLoaded"), //歌曲进度条
                _time=$("#time"), //音乐动态时间

                playMode=$("#playMode"), //播放模式
                singleClass="icon-danquxunhuan",
                sequenceClass="icon-shunxubofang",
                disorderClass="icon-suijibofang"
            }={}
        ){
            //控制声音大小
            voiceSlider.onclick=()=>{
                let x=event.offsetX;//距左边的X轴
                let Width=voiceSlider.offsetWidth;//整个div的长度
                this.voiceSize=x/Width;
                this.voiceControl();
            }; 
            //点击声音图标
            voiceIcon.onclick=()=>{
                this.isVoice=!this.isVoice;
                this.voiceControl();
            }
            //上一首
            prev.onclick=()=>{
                this.location--;
                if(this.location<0){
                    this.location=this.playlist.length-1;
                }
                this.change();
                if(this.audio.paused){
                    suspend.classList.remove(playClass);
                    suspend.classList.add(pauseClass);
                }
                this.run();
            }
            //下一首
            next.onclick=()=>{
                this.location++;
                if(this.location==this.playlist.length){
                    this.location=0;
                }
                this.change();
                if(this.audio.paused){
                    suspend.classList.remove(playClass);
                    suspend.classList.add(pauseClass);
                }
                this.run();
            }
            //暂停/播放控制
            suspend.onclick=()=>{
                if(this.audio.paused){
                    suspend.classList.remove(playClass);
                    suspend.classList.add(pauseClass);
                    this.run();
                }else{
                    suspend.classList.remove(pauseClass);
                    suspend.classList.add(playClass);
                    this.audio.pause();
                }
            }
            //控制进度条
            musicSlider.onclick=()=>{
                let x=event.offsetX;//距左边的X轴
                let Width=musicSlider.offsetWidth;//整个div的长度
                let duration=this.audio.duration;//歌曲总时长
                this.audio.currentTime=x/Width*duration;
                musicLoaded.style.width=x/Width*100+'%';
            }
            //控制播放顺序
            playMode.onclick=()=>{
                if(this.playbackMode=='single'){//单曲循环 
                    playMode.classList.remove(singleClass);
                    playMode.classList.add(sequenceClass);
                    this.playbackMode='sequence';
                }else if(this.playbackMode=='sequence'){//顺序播放
                    playMode.classList.remove(sequenceClass);
                    playMode.classList.add(disorderClass);
                    this.playbackMode='disorder';
                }else{//乱序播放
                    playMode.classList.remove(disorderClass);
                    playMode.classList.add(singleClass);
                    this.playbackMode='single';
                }
            }
            //列表点击播放
            for(let i=0;i<this.playlist.length;i++){
                li[i].onclick=()=>{
                    this.location=i;
                    this.change();
                    if(this.audio.paused){
                        suspend.classList.remove(playClass);
                        suspend.classList.add(pauseClass);
                    }
                    this.run();
                }
            }
        }
        
    }


    
    let music=new Music($("#audio"),0,0.3,0,"sequence",false,list);
    music.createPlayList();
    music.change();
    music.eventBind();
       
})();

window.onresize=function(){
    screenWH();
}