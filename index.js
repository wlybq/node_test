const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const consolidate = require('consolidate');

const app = express();

// 1.解析cookie
app.use(cookieParser('gskjladsmaklgsakd'));

// 2. 设置session
let arr = [];
for (let i= 0; i< 100000; i++) {
    arr.push(Math.floor(Math.random() * i));
}
app.use(cookieSession({
    name: 'sfsad_sess',
    keys: arr,
    maxAge: 20* 3600* 1000
}));

// 3.解析上传
const MulterHandler = multer({dest: './www/upload-cache'});
app.use(MulterHandler.any());
app.use(bodyParser.urlencoded({extended: false}));

// 4.设置模板引擎
// 输出什么东西
app.set('view engine', 'html');
// 模板文件在哪
app.set('views', path.resolve(__dirname, './views'));
// 使用那种引擎
app.engine('html', consolidate.ejs);

// 5.路由
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/index', require('./routes/index'));


// 6.设置静态资源访问
app.use(express.static(path.resolve(__dirname, '/www')));

// 7.用户请求
app.get('/', function (req, res) {
    res.redirect('/index');
});

app.listen(8080);