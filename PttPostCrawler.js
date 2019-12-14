const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const PttCrawler = require("./PttCrawler.js");

class PttPostCrawler extends PttCrawler {
  constructor(url) {
    super();
    this.url = url;
  }

  getPost() {
    let posts = [];
    this.$(".r-ent").each((index, element) => {
      let date = this.$(element)
        .find(".meta .date")
        .text()
        .split("/");
      console.log(date);
      //取得看板文章標題及 url
      let titleEle = this.$(element).find(".title a");
      let titlePath = titleEle.attr("href");
      posts.push({
        title: titleEle.text(),
        url: this.getFullUrl(titlePath),
        month: date[0],
        date: date[1]
      });
    });
    return posts;
  }
}

module.exports = PttPostCrawler;
