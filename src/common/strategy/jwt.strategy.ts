// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header Authorization
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
//     });
//   }
// }
