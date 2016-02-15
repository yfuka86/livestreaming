```
# common
npm install        # bundle install的なやつ

#dev
npm start

# production
npm install pm2 -g # pm2...unicorn的なやつ、グローバルにインストール
pm2 start app.js --interpreter ./node_modules/.bin/babel-node  # プロセス起動
pm2 list           # 動いているプロセスを確認
pm2 stop :id       # プロセス停止
```