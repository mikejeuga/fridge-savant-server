const generatePasswordHash = require('../auth/generatePasswordHash')
const bcrypt = require('bcryptjs')

describe('test', () => {
  it('works', () => {
    expect(2 + 2).toEqual(4);
  });
});


describe('generatePasswordHash', ()=> {
  it('should return a hashed password', async() => {
    let password = "123456"
    let hashedPassword = await generatePasswordHash(password)
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true)
  })
});