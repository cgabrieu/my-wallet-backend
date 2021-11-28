import * as userSchemas from '../schemas/userSchemas.js';
import * as userService from '../services/userServices.js';
import * as userRepository from '../repositories/userRepository.js';

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (userSchemas.signIn.validate(req.body).error) {
      return res.sendStatus(400);
    }

    const user = await userService.authenticate(email, password);
    if (user) {
      return res.status(200).send({
        name: user.name,
        token: user.token,
      });
    }

    return res.sendStatus(401);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if (userSchemas.signUp.validate(req.body).error) {
      return res.sendStatus(400);
    }

    const user = userRepository.findByEmail(email);

    if (user.rowCount > 0) {
      return res.sendStatus(409);
    }

    await userRepository.createUser(name, email, password);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500);
  }
}
