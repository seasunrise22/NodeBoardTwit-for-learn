# NodeBoardTwit-for-learn
- 개발인원 : 1명
- 역할
  - 전체
## Introduction
Node 를 활용하여 기본적인 웹 애플리케이션을 개발해보고자 했습니다.

웹 애플리케이션 프레임워크는 **Express**를 사용했고, 템플릿 엔진은 **Nunjucks**를 사용했습니다.

데이터베이스는 **MySQL**을 썼는데, 데이터 처리는 **Sequelize** 라이브러리로 했습니다.

로그인은 **Passport** 라이브러리로 로컬전략을 사용하여 구현했습니다. 로컬전략이란 일반적인 아이디, 비밀번호로 로그인하는 방식을 말합니다.

학습용 프로젝트이기 때문에 실사용은 전혀 고려하지 않았으며, 디자인 보다는 기능구현에 초점을 맞추었습니다.

구현한 기능은 아래와 같습니다.

1. 회원가입
2. 로그인
3. 게시판
4. Twit(짧은 글) 작성
## Development Environment
- Node(18.15.0)(18.20.4)
- MySQL(5.7.43)(8.0.39)
- vscode
## Screenshots
## 메인화면
![홈](https://github.com/user-attachments/assets/edce603d-7ed3-4a97-bd2d-675855b65fed)
![글읽기](https://github.com/user-attachments/assets/349ce2dd-45d7-4538-9efb-3c18d5fd7733)

## 로그인, 회원가입(일반, 관리자)
![로그인](https://github.com/user-attachments/assets/980cae09-4060-44f1-8f51-da2d89156043)
![일반회원가입](https://github.com/user-attachments/assets/87572840-56f4-4582-bb23-d230df70c523)
![관리자회원가입](https://github.com/user-attachments/assets/2aecd792-dded-467e-a10f-9cc63f82c207)

---
## Code Preview
## 프로그램의 전반적인 동작 흐름

### 애플리케이션의 엔트리 포인트 app.js 설정

app.js 파일은 Node.js 애플리케이션의 엔트리 포인트로써 각종 초기화 및 설정, 서버 구동을 담당합니다.

아래는 app.js 파일의 대강의 형태입니다.

```javascript
const express = require('express');

// 라우터 로드
const pageRouter = require('./routes/page');

// sequelize 로 데이터베이스와 연결합니다.
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// 서버를 시작하고 지정된 포트에서 대기합니다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
```

---

### 라우팅과 뷰 페이지 렌더링

대부분의 클라이언트의 요청은 app.js 에서 로드한 라우터 대로 분기하여 전달됩니다.

페이지 전환 또한 하나의 요청으로써 라우터를 거치는데, 페이지 전환에 대한 라우팅은 모두 routes 폴더의 page.js 파일에 구현해두었습니다.

우선 app.js 파일에서 페이지 라우터를 로드하고, express 객체에 라우터 객체를 연결합니다.

```javascript
// 라우터 로드
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const twitRouter = require('./routes/twit');
const postRouter = require('./routes/post');
const fakeRouter = require('./routes/fake');

// 라우터를 사용합니다.
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/twit', twitRouter);
app.use('/post', postRouter);
app.use('/fake', fakeRouter);
```

예를 들어, 사용자가 회원가입 버튼을 누르면 /join 으로 요청을 보내게 되고, 이는 join.html 페이지를 렌더링 하라는 요청으로 분기하게 됩니다.

/join 경로에 대한 요청은 pageRouter 에 기술되어 있으며, pageRouter 에는 /join 경로로 요청이 들어올 경우, renderJoin 컨트롤러를 실행시키라고 명시되어 있습니다.

```javascript
router.get('/join', isNotLoggedIn, renderJoin);
```

라우팅의 끝점에는 실제 로직이 구현 된 컨트롤러가 있으며, renderJoin 을 예로 들자면 아래와 같은 형태로써, join.html 파일을 렌더링 하여 보여주는 기능을 합니다.

```javascript
exports.renderJoin = (req, res, next) => {
    res.render('join', {
        title: '회원가입',
    });
};
```

app.js 에서 Nunjucks 템플릿 엔진으로 렌더링하라고 명시해뒀기 때문에 모든 페이지는 Nunjucks로 렌더링 됩니다.

---

### 미들웨어

Express 프레임워크의 기능 중 하나로 **미들웨어** 가 있습니다.

미들웨어란 Express 애플리케이션의 요청-응답 주기에서 실행되는 함수로써, next() 함수를 통해 제어를 다음 미들웨어로 넘기는 식으로 동작합니다.

아래는 로그인 요청에 대한 라우터 정의로써, login 처리를 하기 이전에 **isNotLoggedIn** 미들웨어로 현재 요청을 보낸 주체가 로그인 된 상태인지 아닌지 체크하도록 합니다.

```javascript
router.post('/login', isNotLoggedIn, login);
```

만약 요청주체가 현재 로그인 된 상태라면 next()로 제어를 넘기지 않고 res.redirect로 응답하여 요청-응답 주기를 종료합니다.

---

### MySQL 데이터베이스 생성과 연결

1. config/config.json 파일에 데이터베이스에 대한 정보를 기술
2. models/index.js 파일에서 sequelize 객체를 생성할 때 config.json 파일의 정보를 인자로 전달
3. 터미널에 **npx sequelize db:create** 를 입력하여 데이터베이스를 생성(**db:create** 명령은 자동으로 models 하위의 index.js 파일을 찾아갑니다.)
4. 서버가 시작되면 **sequelize.sync** 메서드를 통해 자동으로 데이터베이스 동기화가 진행
 
---
