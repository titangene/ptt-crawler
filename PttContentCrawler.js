const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const PttCrawler = require("./PttCrawler.js");

class PttContentCrawler extends PttCrawler {
  constructor(url) {
    super();
    this.url = url;
  }

  getContent() {
    return this.$('#main-content').contents()[4].data;
  }
}

module.exports = PttContentCrawler;