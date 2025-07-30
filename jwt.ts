import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { sub: 'any-user-id', username: 'any-username' },
  'a83u28nD82s7HJas93ud82n!sajd923',
  {
    expiresIn: '1h',
  }
);

console.log(token);

//npx ts-node jwt.ts
