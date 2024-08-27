const validEmail = 'admin@admin.com'
const validPassword = 'secret_admin'

const noEmailLoginBody = { email: '', password: validPassword };

const noPasswordLoginBody = { email: validEmail, password: '' };

const notExistingUserBody = { email: 'notfound@email.com', password: validPassword };

const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };

const validLoginBody = { email: validEmail, password: validPassword };

const hashedPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'

const existinUser = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: validEmail,
    password: hashedPassword
  }

export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  validLoginBody,
  existinUser,
}
