import JWTService from '../auth/auth.js';

class JwtMiddleware {
  async validateJwt(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const [, token] = authorization.split(' ');
      const data = JWTService.verifyToken(token);
      req.payload = data;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
}

export default new JwtMiddleware();
