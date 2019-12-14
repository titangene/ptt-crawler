const fs = require("fs");

const PttPostCrawler = require("./PttPostCrawler.js");
const PttContentCrawler = require("./PttContentCrawler.js");

let baseUrl = "https://www.ptt.cc";
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index.html`;

async function pttMobilesalesCrawling() {
  const crawler = new PttPostCrawler(pttMobilesalesUrl);
  await crawler.loadHtmlData();
  console.log("run");
  const post = crawler.getPost();
  console.log(post);
  saveToJson(post);
}

async function pttMobilesalesContentCrawling() {
  let postUrl = 'https://www.ptt.cc/bbs/mobilesales/M.1576286469.A.087.html';
  const crawler = new PttContentCrawler(postUrl);
  await crawler.loadHtmlData();
  console.log(crawler.getContent());
}

pttMobilesalesCrawling();
// pttMobilesalesContentCrawling();

function saveToJson(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, '  '));
}
