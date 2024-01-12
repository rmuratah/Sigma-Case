import { render, screen } from '@testing-library/react';
import FormsProfile from './presentation/components/forms/FormsProfile';

test('renders learn react link', () => {
  render(<FormsProfile email=''/>);
  const linkElement = screen.getByText(/Profile/i);
  expect(linkElement).toBeInTheDocument();
});
