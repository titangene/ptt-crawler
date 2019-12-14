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
    let assign = "：";
    let result = content
      .split("：")
      .join("\n")
      .split(/\r?\n/)
      .filter(item => item !== "")
      .map(item => {
        return item.replace(/ /g, "");
      });

    console.log(result);
    return result;
    // return {
    //   name: result[1],
    //   buy_moment: result[1]
    // };
  }
}

module.exports = PttContentCrawler;
