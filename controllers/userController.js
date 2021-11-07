const User = require('../model/user');

const handleDuplicateField = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  if (keys.includes('email')) message = 'User already exists';
  return message;
}

const handleCastError = (err) => {
  const message = `Invalid ${err.errors.path}: ${err.errors.value}.`;
  return message;
}

const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return message;
}

const handleSignUp = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      userType: req.body.userType,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    let message = 'something went wrong';
    if (err.code === 11000) message = handleDuplicateField(err);
    if (err.name === 'ValidationError') message = handleValidationError(err);
    if (err.name === 'CastError') message = handleCastError(err);
    return res.status(400).json({
      success: false,
      message: message,
    });
  }
}

const updateUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    let  user = await User.findOne({ email });
    await user.update({ $set: req.body }, { runValidators: true });
    user = await User.findOne({ email });
    return res.status(200).json({
      success: true,
      message: 'user updated successfully',
      user,
    });
  } catch (err) {
    let message ='something went wrong';
    if (err.code === 11000) message = handleDuplicateField(err);
    if (err.name === 'ValidationError') message = handleValidationError(err);
    if (err.name === 'CastError') message = handleCastError(err);
    return res.status(400).json({
      success: false,
      message: message,
    })
  }
}

module.exports = {
  handleSignUp,
  updateUserByEmail,
}