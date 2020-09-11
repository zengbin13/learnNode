const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

let game = require('./game');
let userWinCount = 0,
  sameCount = 0,
  playLastAction = null;

http
  .createServer((req, res) => {
    let parseUrl = url.parse(req.url);
    if (parseUrl.pathname === '/favicon.ico') {
      res.writeHead(200);
      res.end();
      return;
    }
    if (parseUrl.pathname === '/') {
      res.writeHead(200);
      fs.createReadStream(__dirname + '/index.html').pipe(res);
      return;
    }
    if (parseUrl.pathname === '/game') {
      let query = querystring.parse(parseUrl.query);
      let playAction = query.action;
      let gameResult = game.gameLogic(playAction);

      if (playAction && playLastAction === playAction) {
        sameCount++;
      } else {
        sameCount = 0;
      }
      playLastAction = playAction;
      console.log(sameCount);
      if (userWinCount >= 3 || sameCount >= 9) {
        res.writeHead(500);
        res.end('我不和你玩了！！！');
        return;
      }
      if (sameCount >= 3) {
        res.writeHead(400);
        res.end('你作弊');
        sameCount = 9;
        return;
      }
      res.writeHead(200);
      if (gameResult === 0) {
        userWinCount = 0;
        res.end('平局！');
      } else if (gameResult === 1) {
        userWinCount++;

        res.end('你赢了 ！！！');
      } else if (gameResult === -1) {
        userWinCount = 0;
        res.end('你输了');
      }
    }
  })
  .listen(5000);
