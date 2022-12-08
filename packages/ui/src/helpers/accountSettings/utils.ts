import { Auth } from 'aws-amplify';

import { AmplifyUser } from '../../types';
import { getLogger } from '../utils';

const logger = getLogger('Auth');

type ChangePasswordInput = {
  user: AmplifyUser;
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  user,
  currentPassword,
  newPassword,
}: ChangePasswordInput): Promise<void> => {
  try {
    logger.debug('calling Auth.changePassword');
    /**
     * Auth.changePassword returns `Promise<"SUCCESS">`. We're not interested
     * in its resolved string value, so we just return Promise.resolve() on success.
     */
    await Auth.changePassword(user, currentPassword, newPassword);
    logger.debug('Auth.changePassword was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.changePassword failed with error', e);
    return Promise.reject(e);
  }
};

export const deleteUser = async () => {
  try {
    logger.debug('calling Auth.deleteUser');
    await Auth.deleteUser();
    logger.debug('Auth.deleteUser was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.deleteUser failed with error', e);
    return Promise.reject(e);
  }
};

interface UpdateUserAttributes {
  user: AmplifyUser;
  attributes: Record<string, string>;
}
export const updateUserAttributes = async ({
  user,
  attributes,
}: UpdateUserAttributes) => {
  try {
    logger.debug('calling Auth.updateUserAttributes');
    await Auth.updateUserAttributes(user, attributes);
    logger.debug('Auth.updateUserAttributes was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.updateUserAttributes failed with error', e);
    return Promise.reject(e);
  }
};

interface VerifyUserAttribute {
  attribute: 'email' | 'phone_number';
  code: string;
}

export const VerifyUserAttributeSubmit = async ({
  attribute,
  code,
}: VerifyUserAttribute) => {
  try {
    logger.debug('calling Auth.verifyCurrentUserAttributeSubmit');
    await Auth.verifyCurrentUserAttributeSubmit(attribute, code);
    logger.debug('Auth.verifyCurrentUserAttributeSubmit was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.verifyCurrentUserAttributeSubmit failed with error', e);
    return Promise.reject(e);
  }
};
