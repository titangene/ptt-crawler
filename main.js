const PttCrawler = require('./PttCrawler.js');

let baseUrl = 'https://www.ptt.cc';
let pttMobilesalesUrl = `${baseUrl}/bbs/mobilesales/index.html`;

async function pttMobilesalesCrawling() {
  const crawler = new PttCrawler(pttMobilesalesUrl);
  await crawler.loadHtmlData();
  console.log(crawler.getPost());
}

pttMobilesalesCrawling();

function saveToJson(data) {
  fs.writeFileSync('result.json', JSON.stringify(data, null, '  '));
}