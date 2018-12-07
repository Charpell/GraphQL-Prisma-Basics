import bcrypt from  'bcryptjs';

const hashPassword = password => {
  if(password.length < 8) {
    throw new Error('Password must be 8 characters or longer')
  }

  return bcrypt.hash(args.data.password, 10)
}

export { hashPassword as default }