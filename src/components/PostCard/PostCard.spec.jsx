import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { mock } from './mock';

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard  {...mock} />);
  
    expect(screen.getByRole('img')).toHaveAttribute('src', mock.cover);
    expect(screen.getByRole('heading', { name: mock.title })).toBeInTheDocument();
    expect(screen.getByText(mock.content)).toBeInTheDocument();
  });

  it('should match with snapshot', () => {
    const { asFragment } = render(<PostCard {...mock} />);

    expect(asFragment()).toMatchSnapshot();
  });
});