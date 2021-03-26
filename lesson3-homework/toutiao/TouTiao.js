function intervalTime(startTime,endTime) {
    var date3 =  (endTime- startTime)*1000; 
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    var leave1 = date3 % (24 * 3600 * 1000); 
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000); 
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000); 
    var seconds = Math.round(leave3 / 1000);
    if(days > 0){
        return days + "天"
    }
    else if(hours > 0){
        return hours + "小时"
    }
    else if(minutes > 0){
        return minutes + "分钟"
    }
    else{
        return seconds + "秒"
    }
}
window.onload = function () {
    var url = "load.json"
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            for(var i in json){
                var timestamp=new Date().getTime();
                console.log(timestamp);
                var center = document.getElementsByClassName("center");
                if(json[i]["single_mode"] == true){
                    var single_mode = document.createElement('div');
                    center[0].appendChild(single_mode);
                    single_mode.setAttribute('class', "single-mode")
                    var main_img = document.createElement('div');
                    single_mode.appendChild(main_img);
                    main_img.setAttribute('class', "main-img");
                    var middle_image_url = document.createElement('img');
                    main_img.appendChild(middle_image_url);
                    middle_image_url.setAttribute('src', json[i]["middle_image_url"]);
                    var main_right = document.createElement('div');
                    single_mode.appendChild(main_right);
                    main_right.setAttribute('class', "main-right");
                    var main_right_1 = document.createElement('div');
                    main_right.appendChild(main_right_1);
                    main_right_1.setAttribute('class', "main-right-1");
                }
                else{
                    var single_mode_no = document.createElement('div');
                    center[0].appendChild(single_mode_no);
                    single_mode_no.setAttribute('class', "single-mode-no");
                    var main_right = document.createElement('div');
                    single_mode_no.appendChild(main_right);
                    main_right.setAttribute('class', "main-right");
                    var main_right_1 = document.createElement('div');
                    main_right.appendChild(main_right_1);
                    main_right_1.setAttribute('class', "main-right-1");
                }

                var main_title = document.createElement('div');
                main_right_1.appendChild(main_title);
                main_title.setAttribute('class', "main-title");
                var main_title_a = document.createElement('a');
                main_title.appendChild(main_title_a);
                main_title_a.setAttribute('href', json[i]["news_url"]);
                main_title_a.setAttribute('class', "link");
                main_title_a.setAttribute('target', "_blank");
                main_title_a.innerHTML = json[i]["title"];

                var foot_bar = document.createElement('div');
                main_right_1.appendChild(foot_bar);
                foot_bar.setAttribute('class', "foot-bar");

                var foot_bar_left = document.createElement('div');
                foot_bar.appendChild(foot_bar_left);
                foot_bar_left.setAttribute('class', "foot-bar-left");

                if(json[i]["media_avatar_url"] != ""){
                    var media_tag = document.createElement('a');
                    foot_bar_left.appendChild(media_tag);
                    media_tag.setAttribute('class',"media-tag link");
                    media_tag.setAttribute('href', json[i]["media_url"]);
                    media_tag.setAttribute('target', "_blank");
                    var media_img = document.createElement('img');
                    media_tag.appendChild(media_img);
                    media_img.setAttribute('src', json[i]["media_avatar_url"]);
                }
                var media_name = document.createElement('a');
                foot_bar_left.appendChild(media_name);
                media_name.setAttribute('class', "link");
                media_name.setAttribute('href', json[i]["media_url"]);
                media_name.setAttribute('target', "_blank");
                media_name.innerHTML = json[i]["media_name"]; 
            
                var comment = document.createElement('a');
                foot_bar_left.appendChild(comment);
                comment.setAttribute('class', "link");
                comment.setAttribute('href', json[i]["news_url"]);
                comment.setAttribute('target', "_blank");
                comment.innerHTML = " ⋅ " + json[i]["comments"] + "评论";

                var action_time = document.createElement('span');
                foot_bar_left.appendChild(action_time);
                var t1 = timestamp/1000;
                var t2 = json[i]["behot_time"];
                action_time.innerHTML = " ⋅ " + intervalTime(t2,t1) + "前";

                var foot_bar_right = document.createElement('div');
                foot_bar.appendChild(foot_bar_right);
                foot_bar_right.setAttribute('class', "foor-bar-right");
            }
        }
    }
}
