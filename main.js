const fs = require("fs");

const PttPostCrawler = require("./PttPostCrawler.js");
const PttContentCrawler = require("./PttContentCrawler.js");

let baseUrl = "https://www.ptt.cc";
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index.html`;

async function pttMobilesalesCrawling() {
  const crawler = new PttPostCrawler(pttMobilesalesUrl);
  await crawler.loadHtmlData();
  const posts = await crawler.getPost();
  saveToJson(posts);
}

pttMobilesalesCrawling();

function saveToJson(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, "  "));
}
