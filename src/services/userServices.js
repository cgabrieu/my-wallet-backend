/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

export async function authenticate(email, password) {
  const user = await userRepository.findByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    await sessionRepository.create(user);

    return {
      token,
    };
  }
  return null;
}
