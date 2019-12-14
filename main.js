const fs = require("fs");

const PttPostCrawler = require("./PttPostCrawler.js");
const PttContentCrawler = require("./PttContentCrawler.js");

let baseUrl = "https://www.ptt.cc";
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index.html`;

let posts = [];
let untilNextPage = true;
let currentUrl = pttMobilesalesUrl;

async function pttMobilesalesCrawling(url) {
  const crawler = new PttPostCrawler(url);
  await crawler.loadHtmlData();
  
  untilNextPage = crawler.isFirstPostCurrentMonth();
  if (!untilNextPage) return;

  posts.push(await crawler.getPost());

  return crawler.getPrevPageUrl();
}

let testUrl = 'https://www.ptt.cc/bbs/mobilesales/index19260.html';

while (untilNextPage && currentUrl !== testUrl) {
  setTimeout(function(){
    console.log(currentUrl);
    currentUrl = pttMobilesalesCrawling(currentUrl);
  }, 3000);
  console.log(currentUrl);
}

pttMobilesalesCrawling(currentUrl)
  .then(url => {
    console.log(url);
  });
// console.log(currentUrl);

// saveToJson(posts.flat());

function saveToJson(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, "  "));
}
