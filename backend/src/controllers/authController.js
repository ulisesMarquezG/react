const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const users = [                // ejemplo sin BD: usuarios “hardcodeados”
  { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('1234', 8) }
];
const generateToken = require('../utils/generateToken');

exports.login = async(req, res) => {
  // 1) Validar inputs
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  // 2) Verificar usuario y password
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: 'Credenciales inválidas' });

  // 3) Generar JWT
  const token = generateToken({ id: user.id, username: user.username });
  res.json({ token });
};

exports.getProfile = (req, res) => {
  // protect middleware añade req.user
  res.json({ id: req.user.id, username: req.user.username });
};
