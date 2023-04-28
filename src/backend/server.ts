// ES6のインポートの書き方
// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import mysql from 'mysql';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
// const router = express.Router();
const port = 3000;

// MariaDBの設定
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'tsucchy',
  password: 'n2u5xqlL',
  database: 'questionDB'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 特定のオリジンからのリクエストに対してのみCORS制限を回避する
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.listen(port, () => {
  console.log('listen: ' + port);
});

// ログイン処理  
app.post('/login', (req: any, res: any) => {
  console.log("[express]req.body=>");
  console.log(req.body);

  // 入力文字が空白だったらエラー(これ以下の処理は実行しない)
  if(req.body.id == '' || req.body.password == '') {
    console.log("[express]unfilled.");
    return res.status(500).send({
      error: 'unfilled'
    });
  }

  // ユーザ認証
  var sql: string = `select * from user where userid = '${req.body.id}'`;
  con.query(sql, function(err: any, result: any, fields: any) {
    if (err) {
      // 予期せぬエラー(これ以下の処理は実行しない)
      return res.status(500).end();
    }

    console.log('[express]result=>');
    console.log(result);

    // idが登録されていなかったら
    if (result.length == 0) {
      console.log("[express]no id");
      // エラー返却
      res.status(500).send({
        error: 'unregistered'
      });
    } 
    // パスワードが間違っていたら
    else if(result[0].password != req.body.password) {
      console.log("[express]not pass");
      // エラー返却
      res.status(500).send({
        error: 'incorrect'
      });
    }
    // 正常終了
    else {
      console.log("[express]ok");
      res.send({
        success: 'ログイン成功'
      });
    }
  });
});

// 新規会員登録
app.post('/register', (req: any, res: any) => {
  console.log("[express]req.body=>");
  console.log(req.body);

  // 入力文字が空白だったらエラー(これ以下の処理は実行しない)
  if(req.body.id == '' || req.body.email == ''|| req.body.password == '') {
    return res.status(500).send({
      error: 'unfilled'
    });
  }
  
  // ユーザー登録処理
  var sql: string = `insert into user(userid, email, password) values("${req.body.id}", "${req.body.email}", "${req.body.password}")`;
  con.query(sql, function(err: any, result: any, fields: any) {
    if(err) {
      console.log("[express]e=>");

      // 重複エラー
      if(err.code == 'ER_DUP_ENTRY') {
        console.log("[express]ER_DUP_ENTRY");
        res.status(500).send({
          error: 'duplicate'
        });
      }
      
      // 予期せぬエラー
      else {
        console.log("[express]unknown error.");
        res.status(500).end();
      }
    } else {
      // 正常終了
      console.log("[express]result=>");
      console.log(result);
      res.send({
        success: 'ok'
      });
    }
  });
});

// 受信箱
app.get('/messages', (req: any, res: any) => {
  
  // クエリがなかったら
  if(!req.query.userid) {
    // 予期せぬエラー
    return res.send("ERROR: クエリが存在しない");
  }
  // 質問一覧を取得
  var sql: string = `select * from question where userid="${req.query.userid}"`;
  con.query(sql, function(err: any, result: any, fields: any) {
    if(err) {
      console.log("[express]error");
      // 予期せぬエラー
      throw new Error("[受信箱]SQL失敗");
    }

    console.log('[express]result=>');
    console.log(result);

    // 正常終了 APIエンドポイントを設定後リダイレクト
    app.get('/api/messages', (req: any, res: any) => {
      res.json(result);
    });
    res.redirect('http://localhost:5173/messages');
  });
});

// マイページアクセス時
app.get('/mypage', (req: any, res: any) => {
  
  // クエリがなかったら
  if(!req.query.userid) {
    // 予期せぬエラー
    return res.send("ERROR: クエリが存在しない");
  } 

  // ログイン情報を取得
  var sql: string = `select userid, email from user where userid="${req.query.userid}"`;
  con.query(sql, function(err: any, result: any, fields: any) {
    if(err) {
      // 予期せぬエラー
      throw new Error("[マイページ]SQL失敗");
    }
    
    console.log('[express]result=>');
    console.log(result);

    // 正常終了 APIエンドポイント
    app.get('/api/mypage', (req: any, res: any) => {
      res.json(result);
    });
    res.redirect('http://localhost:5173/mypage');
  });
});