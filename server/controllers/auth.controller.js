const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().replace(/[<>]/g, '').slice(0, maxLength) : '';
}

async function register(request, response, next) {
  try {
    const name = clean(request.body.name, 120);
    const email = clean(request.body.email, 254).toLowerCase();
    const phone = clean(request.body.phone, 30);
    const alternativeIdType = clean(request.body.alternativeIdType, 40);
    const idReference = clean(request.body.idReference, 100);
    const password = typeof request.body.password === 'string' ? request.body.password : '';

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone ||
        !alternativeIdType || !idReference || password.length < 8 || password.length > 200) {
      response.status(400).json({ error: 'Please provide valid registration details.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, phone, alternativeIdType, idReference, passwordHash },
      select: { id: true, name: true, email: true, phone: true, alternativeIdType: true, idReference: true }
    });
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    response.status(201).json({ token, user });
  } catch (error) {
    if (error.code === 'P2002') {
      response.status(409).json({ error: 'An account with that email already exists.' });
      return;
    }
    next(error);
  }
}

module.exports = { register };
