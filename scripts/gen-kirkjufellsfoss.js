const fs = require('fs');
const path = require('path');

// 英文翻译
const en = {
  "meta": {
    "title": "Kirkjufellsfoss｜Photographic Hotspot with Iconic Waterfall & Distinctly Shaped Mountain - Iceland",
    "description": "Complete guide to Kirkjufellsfoss in Grundarfjörður, Iceland. Learn about the iconic waterfall, panoramic views, photography tips, and visitor information."
  },
  "hero": {
    "title": "Kirkjufellsfoss",
    "subtitle": "Photographic Hotspot with Iconic Waterfall & Distinctly Shaped Mountain, Iceland",
    "rating": "4.6(7,037)",
    "reviewCount": "7,037 real reviews",
    "hours": "Open 24 hours",
    "openMaps": "View Location",
    "bgImage": "/gallery/Kirkjufellsfoss (1).jpg"
  },
  "intro": {
    "aboutTitle": "About Kirkjufellsfoss",
    "aboutText": "Kirkjufellsfoss is one of Iceland's most photographed waterfalls, located near the iconic Kirkjufell mountain in Grundarfjörður, Snæfellsnes Peninsula.",
    "title": "Discover Iceland's Most Photogenic Waterfall",
    "description": "Kirkjufellsfoss is a small but mighty waterfall that has become one of Iceland's most iconic photographic spots. With Kirkjufell mountain rising dramatically in the background, this location offers breathtaking panoramic views.\n\nThe waterfall consists of multiple cascades, and there's a walking path that allows you to view it from different angles. Whether you visit during the bright summer midnight sun or the northern lights season in winter, Kirkjufellsfoss never fails to impress.",
    "visitGuide": {
      "title": "Visit Tips",
      "items": [
        "Best photography light is during sunrise or sunset",
        "The walking path around the waterfall is easy and suitable for all ages",
        "Visit in summer for midnight sun or winter for northern lights",
        "Multiple viewing angles available from the designated paths"
      ]
    },
    "highlights": {
      "title": "Highlights",
      "items": [
        "One of the most photographed locations in Iceland",
        "Iconic Kirkjufell mountain as the backdrop",
        "Multiple waterfall cascades with walking paths",
        "Perfect for northern lights photography in winter"
      ]
    },
    "alsoKnownAs": {
      "title": "Also Known As",
      "items": [
        "Church Mountain Waterfall",
        "Kirkjufell Waterfall",
        "Snæfellsnes Peninsula Icon"
      ]
    }
  },
  "basicInfo": {
    "title": "Basic Information",
    "officialName": "Official Name",
    "officialNameValue": "Kirkjufellsfoss",
    "type": "Attraction Type",
    "typeValue": "Waterfall, Natural Landmark, Photography Spot, Hiking Area",
    "country": "Country",
    "countryValue": "Iceland",
    "city": "City / Location",
    "cityValue": "Grundarfjörður, Snæfellsnes Peninsula",
    "googleRating": "Google Rating",
    "ratingValue": "4.6 (7,037 real reviews)",
    "phone": "Phone",
    "phoneValue": "N/A (Natural Site)",
    "address": "Address",
    "addressValue": "WMGQ+FFJ, 351 Grundarfjörður, Iceland"
  },
  "hours": {
    "title": "Opening Hours",
    "fortress": "Site Access",
    "fortressDesc": "The waterfall and surrounding area are accessible 24 hours a day, year-round. No entrance fee required.",
    "fortressTime": "24 Hours",
    "tip": "Best visited during daylight hours for safety. Summer offers midnight sun viewing opportunities."
  },
  "tickets": {
    "title": "Ticket Prices",
    "fortress": "Site Access",
    "free": "Free Admission",
    "fortressDesc": "Kirkjufellsfoss is a natural site with free public access. No tickets required.",
    "parking": "Parking",
    "parkingDesc": "Free parking available near the site. Can get crowded during peak season.",
    "parkingPrice": "Free"
  }
};

// 中文翻译
const zh = {
  "meta": {
    "title": "Kirkjufellsfoss｜冰岛标志性瀑布与独特山景的摄影胜地",
    "description": "冰岛 Grundarfjörður Kirkjufellsfoss 完整指南。了解标志性瀑布、全景视角、摄影技巧和游客信息。"
  },
  "hero": {
    "title": "Kirkjufellsfoss",
    "subtitle": "冰岛标志性瀑布与独特山景的摄影胜地",
    "rating": "4.6(7,037)",
    "reviewCount": "7,037 条真实评价",
    "hours": "全天 24 小时开放",
    "openMaps": "查看位置",
    "bgImage": "/gallery/Kirkjufellsfoss (1).jpg"
  },
  "intro": {
    "aboutTitle": "关于 Kirkjufellsfoss",
    "aboutText": "Kirkjufellsfoss 是冰岛被拍摄最多的瀑布之一，位于斯奈山半岛 Grundarfjörður 附近的标志性 Kirkjufell 山旁。",
    "title": "探索冰岛最具摄影价值的瀑布",
    "description": "Kirkjufellsfoss 是一个小而震撼的瀑布，已成为冰岛最具标志性的摄影地点之一。Kirkjufell 山在背景中戏剧性地拔地而起，提供了令人惊叹的全景视角。\n\n瀑布由多个级联组成，有一条步行小径可以让你从不同角度观赏。无论你是在明亮的夏季午夜阳光还是冬季的北极光季节来访，Kirkjufellsfoss 都不会让你失望。",
    "visitGuide": {
      "title": "游览建议",
      "items": [
        "最佳摄影光线是日出或日落时分",
        "瀑布周围的步行小径轻松易行，适合所有年龄段",
        "夏季可体验午夜阳光，冬季可观赏北极光",
        "指定小径提供多个观赏角度"
      ]
    },
    "highlights": {
      "title": "景区特色",
      "items": [
        "冰岛被拍摄最多的地点之一",
        "标志性的 Kirkjufell 山作为背景",
        "多级瀑布级联与步行小径",
        "冬季拍摄北极光的绝佳地点"
      ]
    },
    "alsoKnownAs": {
      "title": "别名",
      "items": [
        "教堂山瀑布",
        "Kirkjufell 瀑布",
        "斯奈山半岛标志"
      ]
    }
  },
  "basicInfo": {
    "title": "基础信息",
    "officialName": "正式名称",
    "officialNameValue": "Kirkjufellsfoss",
    "type": "景点类型",
    "typeValue": "瀑布、自然地标、摄影胜地、徒步区",
    "country": "国家",
    "countryValue": "冰岛（Iceland）",
    "city": "城市 / 位置",
    "cityValue": "Grundarfjörður，斯奈山半岛",
    "googleRating": "谷歌评分",
    "ratingValue": "4.6 (7,037 条真实评价)",
    "phone": "联系电话",
    "phoneValue": "无（自然景点）",
    "address": "地址",
    "addressValue": "WMGQ+FFJ, 351 Grundarfjörður, Iceland"
  },
  "hours": {
    "title": "开放时间",
    "fortress": "景区开放",
    "fortressDesc": "瀑布及周边区域全年全天 24 小时可进入。无需门票。",
    "fortressTime": "24 小时",
    "tip": "建议白天参观以确保安全。夏季提供午夜阳光观赏机会。"
  },
  "tickets": {
    "title": "门票价格",
    "fortress": "景区进入",
    "free": "免费开放",
    "fortressDesc": "Kirkjufellsfoss 是自然景点，公众可免费进入。无需购票。",
    "parking": "停车",
    "parkingDesc": "景区附近有免费停车场。旺季可能会车位紧张。",
    "parkingPrice": "免费"
  }
};

const messagesDir = path.join(__dirname, '..', 'src', 'messages');

fs.writeFileSync(
  path.join(messagesDir, 'kirkjufellsfoss.en.json'),
  JSON.stringify(en, null, 2)
);
console.log('Created kirkjufellsfoss.en.json');

fs.writeFileSync(
  path.join(messagesDir, 'kirkjufellsfoss.zh.json'),
  JSON.stringify(zh, null, 2)
);
console.log('Created kirkjufellsfoss.zh.json');

console.log('Done!');
