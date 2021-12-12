import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
    allowedTags: [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }
    try {
        const post = await Post.findById(id);
        // 포스트가 존재하지 않을 때
        if (!post) {
            ctx.status = 404; // Not Found
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
    return next();
};

// POST /api/posts { title : 제목, body : 내용, tags [태그1, 태그2]}
export const write = async ctx => {
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있음을 검증
        title: Joi.string().required(), // required()가 있으면 필수 항목
        body: Joi.string().required(),
        tags: Joi.array()
            .items(Joi.string())
            .required(), // 문자열로 이루어진 배열
    });

    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }


    const { title, body, tags } = ctx.request.body;
    const post = new Post ({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save(); // save 함수가 실행되면 DB에 저장 , await을 사용할 때는 try/catch로 오류를 처리해야한다.
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = body => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// GET /api/posts?username=&tag=&page=
export const list = async ctx => {
    // query는 문자열이기 때문에 숫자로 변환해 주어야 한다.
    // 값이 주어지지 않았다면 1을 기본으로 사용한다.
    const page = parseInt(ctx.query.page || '1', 10);

    if (page < 1) {
        ctx.status = 400;
        return;
    }
    const { tag, username } = ctx.query;
    // tag, username 값이 유효하다면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
    };

    try {
        const posts = await Post.find(query)
        .sort({ _id: -1 })      // 내림차로 정렬
        .limit(10)              // 한번에 보여줄 포스트 10개
        .skip((page - 1) * 10)  // 페이지당 열개씩 넘김
        .lean()                 // 데이터를 처음부터 JSON 형태로 조회할 수 있다. (toJSON 생략 가능)
        .exec();                // 검색 후 배열로 반환
        const postCount = await Post.countDocuments().exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));    // 마지막 페이지 알려주기
        ctx.body = posts.map(post => ({
            ...post,
            body: removeHtmlAndShorten(post.body),
        }));    
        // find()를 통해 조회한 데이터는 mongoose 문서 인스턴스의 형태이므로 데이터를 바로 변형할 수 없다.
        // toJSON() 함수를 실행하여 JSON 형태로 변환한 뒤 필요한 변형을 일으켜 주어야 한다.
    } catch (e) {
        ctx.throw(500, e);
    }
};

// GET /api/posts/:id
export const read = ctx => {
    ctx.body = ctx.state.post;
};

// DELETE /api/posts/:id
export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
    } catch (e) {
        ctx.throw(500, e);
    }
};

// PATCH /api/posts/:id { title : 수정, body : 수정 내용, tags : [수정, 태그] }
export const update = async ctx => {
    const { id } = ctx.params;
    // write에서 사용한 schema와 비슷한데, required()가 없다.
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; // Bad request
        ctx.body = result.error;
        return;
    }

    const nextData = { ...ctx.request.body }; // 객체를 복사하고 body 값이 주어졌으면 HTML 필터링
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }
    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new : true, // 이 값을 설정하면 업데이트된 데이터를 반환한다.
                        // false일 때는 업데이트되기 전의 데이터를 반환한다.
        }).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};