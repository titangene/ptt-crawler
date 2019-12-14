const PttPostCrawler = require("./PttPostCrawler.js");

let baseUrl = "https://www.ptt.cc";
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index.html`;

async function pttMobilesalesCrawling() {
  const crawler = new PttPostCrawler(pttMobilesalesUrl);
  await crawler.loadHtmlData();
  console.log("run");
  console.log(crawler.getPost());
}

pttMobilesalesCrawling();

function saveToJson(data) {
  fs.writeFileSync("result.json", JSON.stringify(data, null, "  "));
}
