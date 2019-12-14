const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

class PttCrawler {
  constructor(url) {
    this.url = url;
  }

  async loadHTMLFromURL() {
    const response = await axios.get(this.url);
    return response.data;
  }

  async loadHtmlData() {
    const responseHtml = await this.loadHTMLFromURL();
    this.$ = cheerio.load(responseHtml);
  }

  getFullUrl(urlPath) {
    return `https://www.ptt.cc${urlPath}`;
  }

  getPost() {
    let posts = [];
    this.$('.r-ent').each((index, element) => {
      let titleEle = this.$(element).find('.title a');
      let titlePath = titleEle.attr('href');
      posts.push({
        title: titleEle.text(),
        url: this.getFullUrl(titlePath)
      });
    });
    return posts;
  }
}

module.exports = PttCrawler;