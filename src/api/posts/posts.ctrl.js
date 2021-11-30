import Post from '../../models/post';

// POST /api/posts { title : 제목, body : 내용, tags [태그1, 태그2]}
export const write = async ctx => {
    const { title, body, tags } = ctx.request.body;
    const post = new Post ({
        title,
        body,
        tags,
    });
    try {
        await post.save(); // save 함수가 실행되면 DB에 저장 , await을 사용할 때는 try/catch로 오류를 처리해야한다.
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const list = ctx => {};

export const read = ctx => {};

export const remove = ctx => {};

export const update = ctx => {};