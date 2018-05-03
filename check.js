const request = require('request');
const { JSDOM } = require('jsdom');
const KEYWORD = "故障"

const check = (area) => {
  // 対応するエリアは各都道府県の文字列
  // tokyo: 東京都
  // EX) http://mainte.plala.or.jp/support/network/kosyo/tokyo/
  const url = `http://mainte.plala.or.jp/support/network/kosyo/${area}/`

  request(url, (e, res, body) => {
    if (e) {
      console.log(e);
      return false;
    }

    try {
      const dom = new JSDOM(body);
      const { document } = dom.window;
      const infos = document.querySelectorAll('.blogbody .toptitle');
      infos.forEach((v) => {
        if( v.textContent.match(KEYWORD) ) {
          console.log(v.parentNode.textContent);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};

const num = process.argv[2];
check(num);
