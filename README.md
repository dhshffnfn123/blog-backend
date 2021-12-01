# 💻 Back-end
> 자바스크립트로 서버를 구현할 수 있는 Node.js와 MongoDB를 사용하여 블로그 백엔드 구현
### 스키마
|필드 이름|데이터 타입|설명|
|:----------|:---------|:--------|
|title|문자열|제목|
|body|문자열|내용|
|tags|문자열 배열|태그 목록|
|publishedDate|날짜|작성 날짜|
___
### 🛠 Install
> Koa <br>
> eslint-config-prettier <br>
> nodemon <br>
> koa-router <br>
> koa-bodyparsera <br>
> mongoose <br>
> dotenv <br>
> esm <br>
> joi
___
# 🧩 Node.js
> 웹 브라우저에서만 사용하던 자바스크립트를 서버에서도 사용할 수 있는 런타임을 개발한 것

## Koa
> + 미들웨어 기능만 갖추고 있으며 나머지는 다른 라이브러리를 적용하여 사용한다. (가벼움) <br>
> - async/await 문법을 정식으로 지원하기 때문에 비동기 작업을 더 편하게 관리할 수 있다.
> * app.use : 미들웨어 함수를 애플리케이션에 등록한다.
> - app use를 사용하여 등록되는 순서대로 처리된다.
> + Koa의 미들웨어 함수는 두개의 파라미터를 받는다. (ctx, next) => { ... }
>   + ctx는 Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있다.
>   + next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수이다.
>   + next를 호출하지 않으면, 그 다음 미들웨어를 처리하지 않는다.
>   + next 함수를 호출하면 Promise를 반환한다.
> * 쿼리 파라미터는 문자열이다.

## koa-router
> + router.get : 첫 번째 파라미터에는 경로를 넣고, 두 번째는 해당 라우트에 적용할 미들웨어 함수를 넣는다.
> - get 키워드는 해당 라우트에서 사용할 HTTP 메서드를 의미한다.
> * 라우터의 파라미터를 설정할 때는 /about/:name 형식으로 콜론을 사용하여 라우트 경로를 설정한다.
>   * 파라미터가 있을수도 있고 없을수도 있다면 /about/:name? 와 같이 ?를 붙인다.
>   * 설정한 파라미터는 함수의 ctx.params 객체에서 조회할 수 있다.
> + URL 쿼리의 경우, 해당 값을 ctx.query에서 조회할 수 있다. (ex: /posts/?id=10)
>   + 쿼리 문자열을 자동으로  객체 형태로 파싱해 주므로 별도로 파싱 함수를 돌릴 필요가 없다.
>   + 쿼리 문자열을 조회할 때는 ctx.querystring을 사용한다.

## REST API
> + REST API는 요청 종류에 따라 다른 HTTP 메서드를 사용한다.
>   + GET    : 데이터 조회 시 사용 
>   + POST   : 데이터를 등록할 때 사용
>   + DELETE : 데이터를 지울 때 사용
>   + PUT    : 데이터를 새 정보로 통째로 교체할 때 사용
>   + PATCH  : 데이터의 특정 필드를 수정할 때 사용
> - REST API를 설정할 때는 API 주소와 메서드에 따라 어떤 역할을 하는지 쉽게 파악할 수 있도록 작성해야 한다.
> * ❗ 포스트 수정 API를 PUT으로 구현할 때는 모든 필드가 다 있는지 검증하는 작업이 필요하다.

## koa-bodyparser
> POST/PUT/PATCH 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어주면,
> 이를 파싱하여 서버에서 사용할 수 있게 한다.
> + 컨트롤러는 __exports.이름 = ...__ 형식으로 함수를 내보내주면 다음과 같은 형식으로 불러올 수 있다.
>   ```
>   const 모듈이름 = require('파일이름');
>   모듈이름.이름();
>   ```
___
# 🍃 MongoDB
> 문서 지향적 NoSQL 데이터베이스<br>
> 이 데이터베이스에 등록하는 데이터들은 유동적인 스키마를 지닐 수 있다. <br>
> 데이터의 구조가 자주 바뀐다면 MongDB가 더 유리하다.

## mongoose
> + mongoose는 Node.js 환경에서 사용하는 MongoDB기반 ODM 라이브러리이다.
> - 이 라이브러리는 데이터베이스 문서들을 자바스크립트 객체처럼 사용할 수 있게 해준다.

## detenv
> + 환경변수들을 파일에 넣고 사용할 수 있게 해주는 개발도구이다.

## Schema
> __Schema__ 는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체이다.
> #### Schema에서 지원하는 타입
>|타입|설명|
>|:----------|:---------|
>|String|문자열|
>|Number|숫자|
>|Date|날짜|
>|Buffer|파일을 담을 수 있는 버퍼|
>|Boolean|true & false 값|
>|Mixed(Schema.Types.Mixed)|어떤 데이터도 넣을 수 있는 형식|
>|ObjectId(Schema.Types.ObjectId)   |객체 아이디, 주로 다른 객체를 참조할 때 넣음  |
>|Array|배열 형태의 값으로 []로 감싸서 사용|

##

### model() 함수
> + 기본적으로 두개의 파라미터가 필요하다. 하나는 스키마의 이름이고, 또 하나는 스키마 객체이다.
> - 데이터베이스는 스키마 이름을 정해주면 그 이름의 복수 형태로 컬렉션 이름을 만든다.
>   - 예를 들어 Post로 이름을 설정하면 컬렉션 이름은 posts가 된다.
>   - 이 컨벤션을 따르고 싶지 않다면, 세번째 파라미터에 원하는 이름을 입력하면 된다.

## CRUD
> ✔ 모든 함수를 호출한 후에는 exec()를 붙여 주어야 서버에 쿼리를 요청한다.

### 데이터 조회
> 1. __find()__  : 데이터 조회
> 2. __findById__ : 특정 id를 가진 데이터 조회

### 데이터 삭제
> 1. __remove()__ : 특정 조건을 만족하는 데이터를 모두 지운다.
> 2. __findByIdAndRemove()__ : id를 찾아서 지운다.
> 2. __findOneAndRemove()__ : 특정 조건을 만족하는 데이터 하나를 찾아서 제거한다.

### 데이터 수정
> + __findByIdAndUpdate()__ : 데이터를 업데이트 한다.
>   + 이 함수는 세 가지 파라미터를 넣어주어야 한다.
>       1. id
>       2. 업데이트 내용
>       3. 업데이트의 옵션
___

## 🔍 요청 검증

### ObjectId 검증
> id가 올바른 형식인지 검증하는 방법
> ```
> import mongoose from 'mongoose';
> const { ObjectId } = mongoose.Types;
> ObjectId.isValid(id);
> ```

### Request Body 검증
> 모든 값을 전달 받았는지 검증하는 방법 <br>
> __✔ src/api/posts/posts.ctrl.js 참고__
