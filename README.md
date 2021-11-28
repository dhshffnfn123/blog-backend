# 💻 Back-end
> 자바스크립트로 서버를 구현할 수 있는 Node.js 사용 
___
### 🛠 Install
> Koa <br>
> eslint-config-prettier <br>
> nodemon
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


