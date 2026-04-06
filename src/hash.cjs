const bcrypt = require("bcrypt");

const password = process.argv[2]; // take password from command line
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log("Hashed password:", hash);
});
