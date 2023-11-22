const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { uploadNotice, getNoticePosts, getNoticeOnePost, afterUploadFile, fileDownload } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
    fs.readdirSync('uploads/files');
} catch (error) {
    console.error('uploads/files 폴더가 없어 uploads/files 폴더를 생성합니다.');
    fs.mkdirSync('uploads/files');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/files/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/file', upload.single('noticeFile'), afterUploadFile);

const upload2 = multer();
router.post('/notice', upload2.none(), uploadNotice) // 인증 미들웨어는 나중에 추가

router.get('/notice/:id', getNoticeOnePost);
router.get('/noticeGetPosts', getNoticePosts);

// 게시물 파일 다운로드
router.get('/fileDownload/:filename', fileDownload);

module.exports = router;