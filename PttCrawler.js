const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

class PttCrawler {
  constructor(url) {
    this.url = url;
  }

  async loadHTMLFromURL() {
    try {
      const response = await axios.get(this.url);
      return response.data; //html resource code
    } catch (err) {
      console.log(err);
    }
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
