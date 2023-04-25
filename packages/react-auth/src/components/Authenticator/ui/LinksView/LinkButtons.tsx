import * as React from 'react';

import { useLinks } from '../../hooks';

import { createDisplayName } from '../utils';

import LinkButton from './LinkButton';

const LinkButtons = (): JSX.Element | null => {
  const { links } = useLinks();

  if (!links?.length) {
    return null;
  }

  return (
    <>
      {links?.map(({ handleButtonAction, linkButtonText }) =>
        linkButtonText ? (
          <LinkButton onClick={handleButtonAction} key={linkButtonText}>
            {linkButtonText}
          </LinkButton>
        ) : null
      )}
    </>
  );
};

LinkButtons.displayName = createDisplayName('LinkButtons');

export default LinkButtons;
