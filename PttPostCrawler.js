const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const PttCrawler = require("./PttCrawler.js");
const PttContentCrawler = require("./PttContentCrawler.js");

class PttPostCrawler extends PttCrawler {
  constructor(url) {
    super();
    this.url = url;
  }

  getPost() {
    let posts = [];
    this.$(".r-ent").each(async (index, element) => {
      let date = this.$(element)
        .find(".meta .date")
        .text()
        .split("/");
      console.log(date);
      //取得看板文章標題及 url
      let titleEle = this.$(element).find(".title a");
      let titlePath = titleEle.attr("href");
      let postUrl = this.getFullUrl(titlePath);

      const pttContentCrawler = new PttContentCrawler(postUrl);
      await pttContentCrawler.loadHtmlData();
      let content = pttContentCrawler.getContent();
      console.log(content);

      posts.push({
        title: titleEle.text(),
        url: postUrl,
        month: date[0],
        date: date[1],
        content: content
      });
    });
    return posts;
  }
}

module.exports = PttPostCrawler;
