import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash; // this는 문서 인스턴스를 가리킨다.(화살표 함수를 사용하면 this는 문서 인스턴스를 가리키지 못한다.)
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true / false
};

UserSchema.statics.findByUsername = function(username) {    // findByUsername : username으로 데이터를 찾는다.
    return this.findOne({ username });
};  // static 함수에서의 this는 모델을 가리킨다. (User)

// hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환시킨다.
UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

// 토큰 발급하기
UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        // 첫 번째 파라미터에는 토큰안에 집어넣고 싶은 데이터를 넣는다.
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣는다.
        {
            expiresIn: '7d', // 7일 동안 유효함
        },
    );
    return token;
}

const User = mongoose.model('User', UserSchema);
export default User;