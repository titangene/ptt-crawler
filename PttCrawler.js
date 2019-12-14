const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

class PttCrawler {
  constructor(url) {
    this.url = url;
  }

  async loadHTMLFromURL() {
    const response = await axios.get(this.url);
    return response.data; //html resource code
  }

  async loadHtmlData() {
    const responseHtml = await this.loadHTMLFromURL();
    this.$ = cheerio.load(responseHtml); //html parser
  }

  getFullUrl(urlPath) {
    return `https://www.ptt.cc${urlPath}`;
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

module.exports = PttCrawler;
