# 💻 Back-end
> 자바스크립트로 서버를 구현할 수 있는 Node.js 사용 
___
### 🛠 Install
> Koa <br>
> eslint-config-prettier <br>
> nodemon <br>
> koa-router <br>
> koa-bodyparsera
___
## Node.js
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

## koa-bodyparser
> POST/PUT/PATCH 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어주면,
> 이를 파싱하여 서버에서 사용할 수 있게 한다.

