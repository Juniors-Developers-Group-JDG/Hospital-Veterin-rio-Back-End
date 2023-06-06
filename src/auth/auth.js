import jwt from 'jsonwebtoken';

class JWTService {
  constructor() {
    this.secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
    this.JWT_CONFIG = {
      algorithm: 'HS256',
      expiresIn: '1h',
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
