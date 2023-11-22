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
- Node(18.15.0)
- MySQL(5.7.43)
- vscode
## Screenshots
## 1. 회원가입

### 일반 사용자 회원가입

![회원가입(일반)_01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/443ee8db-eaef-459d-bb49-5107bb9a3d98)

---

![회원가입(일반)_02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/0ebb35b6-7ef5-40b9-809a-16b6be50be83)

---

![회원가입(일반)_03](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/83ce52dd-d830-423e-bbc2-bd129fa2cad4)

---

### 관리자 회원가입

![관리자01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/61eb4576-1a7b-4d48-878c-1023db1dabf8)

---

![관리자02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/9fbe6dba-7ef3-42da-9546-b0b4e5fce114)

---

## 2. 로그인

### 일반 사용자 로그인

![로그인일반01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/d2011e55-9f85-431d-920b-1c1ec0217520)

---

![로그인일반02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/466a1335-6b04-4923-a924-82d72f24966a)

---

### 관리자 로그인

![관리자로그인01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/e52f6c13-20da-42b5-bb4b-c6c93f6bbbc6)

---

![관리자로그인02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/8fd9d01f-257b-4a4f-ae56-c1777fcb538e)

---

## 3. 게시판

### 관리자만 글작성 가능

![게시판01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/568e3e9a-0518-4209-b951-c4dd6a84023b)

---

![게시판02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/db6f4cb8-9e84-4bff-84b1-5adb53e224ab)

---

### 글작성

![글작성01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/d5c2d6f8-24b0-4bbe-83e4-a6feabc59eca)

---

![글작성02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/b1823ef7-83d3-494f-a4e0-c83b283f34fe)

---

### 글작성(파일 업로드 및 다운로드)

![파일01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/b2043926-f622-4eba-8b98-39862f12624a)

---

![파일02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/f459ee8d-3029-491c-8202-2d726fe24678)

---

![파일03](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/651fc913-5230-4308-a7ce-218a3f4c2d4d)

---

### 페이지네이션

![페이지01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/d40ce5e9-dfcc-4383-a4dd-f78c702fb88a)

---

![페이지02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/ba6daa1b-0431-4083-8746-76360c519846)

---

![페이지03](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/860d9a8e-5117-41cd-9621-4f57265f73cb)

---

## 4. Twit(짧은 글) 작성

### 로그인 해야 글작성 가능

![트윗01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/c0a84564-ac6e-4aca-84dc-36c827c82c91)

---

![트윗02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/eb1a706c-69f0-45aa-b03d-2cb394791062)

---

### 글작성

![트윗짧은글01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/22f10f24-c0a0-4ab6-bace-1d65dfca4fba)

---

![트윗짧은글02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/7c0eeb80-8298-49b5-8b76-0c3339ea92e0)

---

### 글작성(이미지와 함께)

![트윗이미지01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/50fde9ce-a6ee-495c-80be-8ca093d8bd7c)

---

![트윗이미지02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/91f305af-1c64-4e10-8b19-4ea7a29ea30b)

---

### 페이지네이션

![트윗페이지](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/2041367d-27f2-4de6-84b1-ba5d56090e26)

---

### 해시태그 검색

![트윗검색01](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/0199bc7f-d1c6-43d4-844f-71ed245adf41)

---

![트윗검색02](https://github.com/seasunrise22/NodeBasicWeb-for-learn/assets/45503931/d1d7628e-0aca-4c27-afc0-992c10604d94)

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
