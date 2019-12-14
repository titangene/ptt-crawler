const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

class PttCrawler {
  constructor(url) {
    this.url = url;
  }

  async loadHTMLFromURL() {
    const response = await axios.get(this.url);
    console.log(response.status);
    return response.data; //html resource code
  }

  async loadHtmlData() {
    const responseHtml = await this.loadHTMLFromURL();
    this.$ = cheerio.load(responseHtml); //html parser
  }

  getFullUrl(urlPath) {
    return `https://www.ptt.cc${urlPath}`;
  }
}

module.exports = PttCrawler;
