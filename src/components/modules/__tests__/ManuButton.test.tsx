import { render, screen } from '@testing-library/react';
import { CiPaperplane } from 'react-icons/ci';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { routers } from '../../../common/constants/routes';
import MenuButton from '../MenuButton';

describe('MenuButton Component', () => {
  it('renders correctly with icon and message', () => {
    render(
      <BrowserRouter>
        <MenuButton
          path={routers.orders}
          message="Orders"
          Icon={CiPaperplane}
        />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('has correct link', () => {
    render(
      <BrowserRouter>
        <MenuButton
          path={routers.orders}
          message="Orders"
          Icon={CiPaperplane}
        />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe(`/${routers.orders}`);
  });
});
