const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/upload_pic', function (req, res) {
    if (req.files.length < 1) res.redirect('/index');
    let oldname = req.files[0].path;
    let newname = path.join(__dirname, '../uploads/', req.files[0].filename + path.parse(req.files[0].originalname).ext);
    fs.rename(oldname, newname, function (err) {
        if(err) {
            res.send('<script>alert("上传失败！")</script>');
        }
        fs.unlink(oldname, function (err) {
            res.send('<script>alert("上传成功！")</script>');
        });
    });
});


module.exports = router;