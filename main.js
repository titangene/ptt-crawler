const fs = require("fs");

const PttPostCrawler = require("./PttPostCrawler.js");
const PttContentCrawler = require("./PttContentCrawler.js");

let baseUrl = "https://www.ptt.cc";
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index.html`;

let untilNextPage = true;

const sleep = t =>
  new Promise(resolve => {
    setTimeout(resolve, t);
  });

// let testUrl = "https://www.ptt.cc/bbs/mobilesales/index19271.html";
async function pttMobilesalesCrawling(url) {
  // console.log(url);
  // if (url === testUrl) return;
  const crawler = new PttPostCrawler(url);
  await crawler.loadHtmlData();
  untilNextPage = crawler.isFirstPostCurrentMonth();
  await sleep(Math.floor(Math.random() * 5000));
  if (!untilNextPage) return;

  saveToJson(await crawler.getPost());
  return pttMobilesalesCrawling(crawler.getPrevPageUrl());
}

pttMobilesalesCrawling(pttMobilesalesUrl);

function saveToJson(data) {
  const newData = [...JSON.parse(fs.readFileSync("db.json").toString() || "[]"), ...data];
  fs.writeFileSync("db.json", JSON.stringify(newData, null, "  "));
}
