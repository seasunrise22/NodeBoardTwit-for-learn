const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');

dotenv.config(); // dotenv 모듈을 사용하여 .env 파일의 환경 변수들을 로드합니다.

// 라우터 로드
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const twitRouter = require('./routes/twit');
const postRouter = require('./routes/post');
const fakeRouter = require('./routes/fake');

// require('./models') 을 해주는 것 만으로 models/index.js 파일이 로드되고 index.js 파일이 실행됩니다.
// 이 파일에서 db 객체의 sequelize 속성에 sequelize 객체가 할당됩니다. 
// 따라서 const { sequelize } = require('./models'); 코드를 사용하면 sequelize 객체를 가져다 쓸 수 있습니다. 
// 이 객체를 사용하여 데이터베이스와 연결하고, 모델들을 정의하고, 관계들을 설정하는 등의 작업을 수행할 수 있습니다.
const { sequelize } = require('./models');

// sequelize 로 데이터베이스와 연결합니다.
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// passport/index.js 설정 파일을 불러와 module.exports 로 내보낸 함수를 passportConfig 변수에 할당합니다.
const passportConfig = require('./passport');
passportConfig(); // Passport 인증 미들웨어의 설정이 초기화되고, 로컬 전략이 설정됩니다.

const app = express(); // Express 앱 객체를 생성합니다.
app.set('port', process.env.PORT || 8080); // 서버가 사용할 포트 번호를 설정합니다.
app.set('view engine', 'html'); //  Nunjucks 템플릿 엔진을 사용하여 HTML 파일을 렌더링하도록 설정합니다.
nunjucks.configure('views', {
    express: app,
    watch: true,
});
app.use(morgan('dev')); // Morgan 로깅 미들웨어를 사용하여 요청 정보를 로깅합니다. 터미널에 표시됩니다.
app.use(express.static(path.join(__dirname, 'public'))); // public 디렉토리를 정적 파일(CSS)을 제공하는 경로로 설정합니다.
// 이미지와 파일의 업로드 경로를 지정합니다.
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use('/file', express.static(path.join(__dirname, 'uploads/files')));
// JSON과 URL-encoded 형식의 요청 본문을 파싱하는 미들웨어를 사용합니다.
// 해당 미들웨어를 사용하지 않으면 서버가 클라이언트로부터 전송된 데이터를 파싱 즉, 처리할 수 없게 됩니다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 일반 쿠키를 보호하기 위해 사용합니다.
// 이 코드가 없으면 서버는 클라이언트로부터 전송된 쿠키를 파싱할 수 없습니다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 관리용 세션 미들웨어를 사용합니다.
// 이 코드가 없으면 서버는 클라이언트의 세션 정보를 유지할 수 없습니다.
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 쿠키를 변조로부터 보호하는 데 사용됩니다.
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
// 세션 관리 기능을 설정하는 역할을 합니다. 
// 이 코드들이 실행되면, 로그인 시 사용자 정보가 세션에 저장되며, 각 요청마다 세션에서 사용자 정보가 조회됩니다.
// 이 코드들은 passport.serializeUser와 passport.deserializeUser 메서드가 정의된 후에 사용되어야 합니다.
app.use(passport.initialize());
app.use(passport.session());

// 라우터를 사용합니다.
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/twit', twitRouter);
app.use('/post', postRouter);
app.use('/fake', fakeRouter);

// 404 에러 처리용 미들웨어를 사용합니다.
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리용 미들웨어를 사용합니다.
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// 서버를 시작하고 지정된 포트에서 대기합니다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});