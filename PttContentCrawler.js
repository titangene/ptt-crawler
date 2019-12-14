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
    return this.sliceContent(this.$("#main-content").contents()[4].data);
  }

  sliceContent(content) {
    let price = "";
    let data = content
      .split("\n")
      .filter(x => Boolean(x))
      .map(
        x =>
          x
            .split("：")
            .join(":")
            .split(":")
        // .join("\n")
        // .split(/\r?\n/) //換行
      );

    data.filter(item => {
      item[0] = item[0].replace(/ /g, ""); //空白
      if (item[0].includes("欲售價格")) {
        return (price = item[1].match(/\d{4,}/));
      } else if (item[0].includes("欲徵價格")) {
        return (price = item[1].match(/\d{4,}/));
      }
    });

    if (!price) {
      return 0;
    }
    return Number(price[0]);
  }
}

module.exports = PttContentCrawler;
