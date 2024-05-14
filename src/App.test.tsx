import { cleanup, render, screen } from '@testing-library/react';
import { App } from './App';

describe('<App />', () => {
  beforeEach(() => {
    render(<App />);
  });
  afterEach(cleanup);

  it('should render correctly', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: 'scaffold-react-swc' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('src')).toMatch(/.svg$/i);
  });
});
