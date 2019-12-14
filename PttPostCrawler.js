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

  async getPost() {
    let posts = [];

    this.$(".r-ent").each((index, element) => {
      let date = this.$(element)
        .find(".meta .date")
        .text()
        .split("/");

      //取得看板文章標題及 url
      let titleEle = this.$(element).find(".title a");
      let titlePath = titleEle.attr("href");
      let postUrl = this.getFullUrl(titlePath);
      let titleText = titleEle.text();
      let type = "";
      let title = titleText
        .split("/")
        .join("[")
        .split("[")
        .join("]")
        .split("]")
        .filter(x => Boolean(x));
      if (title[0] === "徵") {
        type = "buy";
      } else if (title[0] === "賣") {
        type = "sell";
      } else {
        type = null;
      }

      posts.push({
        title: titleEle.text(),
        url: postUrl,
        month: date[0],
        date: date[1],
        type,
        county: title[1]
      });
    });

    let postUrls = posts.map(post => post.url);

    let postContentTasks = postUrls.map(async url => {
      const crawler = new PttContentCrawler(url);
      await crawler.loadHtmlData();
      return crawler.getContent();
    });

    let postContents = await Promise.all(postContentTasks);

    return posts
      .map((post, index) => {
        return { ...post, price: postContents[index] };
      })
      .filter(post => Boolean(post.price));
  }
}

module.exports = PttPostCrawler;
