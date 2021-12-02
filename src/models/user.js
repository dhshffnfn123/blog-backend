import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

const User = mongoose.model('User', UserSchema);
export default User;