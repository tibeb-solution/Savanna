const jwt = require('jsonwebtoken');

function requireAuth(request, response, next) {
  const authorization = request.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    response.status(401).json({ error: 'Authentication is required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload.sub !== 'string') {
      response.status(401).json({ error: 'Authentication is required.' });
      return;
    }
    if (request.params.id && request.params.id !== payload.sub) {
      response.status(403).json({ error: 'You cannot access this account.' });
      return;
    }
    request.userId = payload.sub;
    next();
  } catch (error) {
    response.status(401).json({ error: 'Authentication is required.' });
  }
}

module.exports = { requireAuth };
