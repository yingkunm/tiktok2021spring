// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    code: 200,
    data: [
      {
        mode: "top",
        top: true,
        title: "联播+ | 习近平：你们是中国沟通的桥梁",
        media: "央视网新闻",
        recommend: 34,
        time: "1小时前",
      },
      {
        mode: "top",
        top: true,
        title: "习近平这次指示，事关共同富裕",
        media: "海外网",
        recommend: 9,
        time: "2小时前",
      },
      {
        mode: "single",
        title: "海南自由贸易港政策制度框架初步建立",
        media: "央视新闻",
        recommend: 773,
        time: "3小时前",
      },
      {
        mode: "single",
        title: "RNGvsEDG第五局集锦:Top虎纳尔神拍3人0换4!皇族归来3:2挺进决赛!",
        media: "游戏说个球",
        recommend: 88,
        time: "4小时前",
      },
      {
        mode: "big_pic",
        title: "如何促进形成义务教育良好生态？|大家谈",
        media: "人民日报评论",
        recommend: 1250,
        time: "5小时前",
        img: "/img/img1.jpg",
      },
      {
        mode: "words&pic",
        title: "山东自残求复磅司机发声：我跟自杀的金德强一样，感到委屈和无助",
        media: "济南时报",
        recommend: 3361,
        img: "/img/img2.jfif",
      },
      {
        mode: "three_pic",
        title: "被恶意诋毁、丑闻缠身的杨振宁，背后藏着怎样的真相？",
        media: "历史文社",
        recommend: 5960,
        img: ["/img/img3.jfif", "/img/img4.jfif", "/img/img5.jfif"],
      },
      {
        mode: "single",
        title: "打麻将为什么说刻子带搭不能留？听听高手思路你就明白其中真理",
        media: "阿光棋牌说",
        recommend: 138,
        time: "6小时前",
      },
      {
        mode: "single",
        title: "浴火重生 再创辉煌——记外交部湖北全球特别推介活动",
        media: "光明网",
        recommend: 10,
        time: "7小时前",
      },
      {
        mode: "words&pic",
        title: "把一整条鱼扔进电饭锅中，第一次见这种做法，出锅真的太香了",
        media: "明玥美食",
        recommend: 3361,
        img: "/img/img6.jpg",
      },
      {
        mode: "words&pic",
        title: "中宣部、中央文明办等6部门启动第八届全国道德模范评选表彰活动",
        media: "央视新闻",
        recommend: 29,
        img: "/img/img7.jfif",
      },
    ],
  });
};
