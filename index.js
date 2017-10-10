const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

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

// 路由
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/index', require('./routes/index'));

// 4.设置静态资源访问
app.use(express.static(path.join(__dirname, '/www')));

// 5.用户请求
app.get('/', function (req, res) {
    res.redirect('/index');
});

app.listen(8080);