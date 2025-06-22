import bcrypt from "bcrypt";

async function makeHash() {
  const saltRounds = 10;               // or 12, 14… higher = slower but stronger
  const hash       = await bcrypt.hash("admin", saltRounds);
  console.log(hash);
}
makeHash();