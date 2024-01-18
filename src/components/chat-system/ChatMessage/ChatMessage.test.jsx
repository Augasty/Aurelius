import { render } from '@testing-library/react';
import ChatMessage from './ChatMessage';
import { expect, test, vitest } from 'vitest';

vitest.mock('../../../firebase', () => ({
    auth: {
      currentUser: {
        uid: 'some-uid',
      },
    },
  }));

test('renders ChatMessage component', () => {
  const message = {
    chat: 'Hello, world!',
    uid: 'someUserId',
    photoURL: 'somePhotoUrl',
  };

  const { getByText, getByAltText } = render(<ChatMessage message={message} />);

  expect(getByText('Hello, world!')).toBeInTheDocument();

  expect(getByAltText('User')).toBeInTheDocument();
});

test('renders ChatMessage component without specific text', () => {
    const message = {
      chat: 'Hello, world!',
      uid: 'someUserId',
      photoURL: 'somePhotoUrl',
    };
  
    
    const { queryByText } = render(<ChatMessage message={message} />);
  
    expect(queryByText('some text that should not be there')).toBeNull();
  });