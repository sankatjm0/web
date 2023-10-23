let char =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?`~";

const generateToken = (key) => {
  let token = "";
  for (let i = 0; i < key.length; i += 2) {
    let index = char.indexOf(key[i]) || char.length / 2;
    let randomIndex = Math.floor(Math.random() * index);
    token += char[randomIndex] + char[index - randomIndex];
  }
  return token;
};
