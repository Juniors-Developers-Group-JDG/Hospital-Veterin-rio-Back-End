import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class JWTService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.JWT_CONFIG = {
      algorithm: 'HS256',
      expiresIn: '7d',
    };
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }

  createToken(payload) {
    return jwt.sign({ data: payload }, this.secret, this.JWT_CONFIG);
  }
}

export default new JWTService();
