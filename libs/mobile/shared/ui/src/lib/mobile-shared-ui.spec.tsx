import { render } from '@testing-library/react';

import MobileSharedUi from './mobile-shared-ui';

describe('MobileSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobileSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
