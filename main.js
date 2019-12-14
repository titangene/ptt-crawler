const fs = require("fs");

const PttPostCrawler = require("./PttPostCrawler.js");
const PttContentCrawler = require("./PttContentCrawler.js");

let baseUrl = "https://www.ptt.cc";
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index19272.html`;

let posts = [];
let untilNextPage = true;

let testUrl = "https://www.ptt.cc/bbs/mobilesales/index19271.html";
async function pttMobilesalesCrawling(url) {
  console.log(url);
  if (url === testUrl) return;
  const crawler = new PttPostCrawler(url);
  await crawler.loadHtmlData();
  untilNextPage = crawler.isFirstPostCurrentMonth();
  if (!untilNextPage) return;

  posts.push(...(await crawler.getPost()));
  return pttMobilesalesCrawling(crawler.getPrevPageUrl());
}

pttMobilesalesCrawling(pttMobilesalesUrl).then(() => {
  saveToJson(posts);
});

function saveToJson(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, "  "));
}
