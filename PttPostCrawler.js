const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
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
      //取得看板文章標題及 url
      let titleEle = this.$(element).find(".title");
      let a = this.$(element)
        .find(".title")
        .has("a");
      if (!a.html()) return; //跳過刪除文章
      let titlePath = titleEle.find("a").attr("href");
      let postUrl = this.getFullUrl(titlePath);
      let titleText = titleEle.text();
      if (titleText.length < 6) return;
      let type = "";
      let title = titleText
        .replace(/^\s+\[/, "")
        .replace(/\s+$/, "")
        .split("]")
        .filter(x => Boolean(x));
      let titleArr = [];
      title.forEach((item, index, arr) => {
        if (!index)
          return (titleArr = item
            .split("/")
            .join("］")
            .split("］")
            .map(w => w));
        return titleArr.push(item);
      });
      titleArr = titleArr.filter(x => Boolean(x));

      if (titleArr[0] === "徵") {
        type = "buy";
      } else if (titleArr[0] === "賣") {
        type = "sell";
      } else {
        type = null;
      }

      let date = postUrl.match(/\d{10,}/);
      //if (!title[1]) return;
      if (!type || title.length < 2) return;
      posts.push({
        title: titleArr[3],
        url: postUrl,
        date: moment.unix(Number(date[0])).format("YYYY-MM-DD"),
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

  getPrevPageUrl() {
    let urlPath = this.$(".wide")
      .eq(1)
      .attr("href");
    return this.getFullUrl(urlPath);
  }

  isFirstPostCurrentMonth() {
    let firstPostDate = this.$(".r-ent .title a")
      .eq(0)
      .attr("href")
      .match(/\d{10}/)[0];
    let month = moment.unix(Number(firstPostDate)).format("MM");
    return month == moment().format("MM");
  }
}

module.exports = PttPostCrawler;
