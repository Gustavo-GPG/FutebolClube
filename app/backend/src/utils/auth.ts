import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  email: string,
  password: string,
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload {
  const data = jwt.verify(token, secret) as TokenPayload;

  return data;
}

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

function decodedEmail(token: string): string {
  const tokenData = extractToken(token);
  const data = verify(tokenData);
  return data.email;
}

export default {
  sign,
  verify,
  decodedEmail,
};
