exports.sendtoken = (user, statusCode, res) => {
  const token = user.getjwttoken();
  console.log(token);
  const options = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // if you use http
    secure: true, // if you use https
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: user._id, email: user.email, token });
};
