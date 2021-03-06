import React from 'react';
import { render } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('SingIn page', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder(/E-mail/i)).toBeTruthy();
    expect(getByPlaceholder(/Senha/i)).toBeTruthy();
  });
});
