import { Schema, model, Document } from 'mongoose';
import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';

// **** Types **** //

export interface IUser extends Document {
  nom: string;
  email: string;
  motDePasse: string;
}

export interface IUserLogin {
  email: string;
  motDePasse: string;
}

// Mongoose
const UserSchema = new Schema<IUser>({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
});

export const User = model<IUser>('User', UserSchema);

// **** Validators (Pour les Routes - Style jet-validators) **** //

const parseUserLogin = parseObject<IUserLogin>({
  email: isString,
  motDePasse: isString,
});

/**
 * Check is a user login object. For the route validation.
 */
function testlogin(arg: unknown, errCb?: TParseOnError): arg is IUserLogin {
  return !!parseUserLogin(arg, errCb);
}

// **** Export default **** //

export default {
  model: User,
  testlogin,
} as const;
