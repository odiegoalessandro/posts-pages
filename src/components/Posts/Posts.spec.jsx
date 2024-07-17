import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const postsMock = { 
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body',
      cover: 'img/img1.png'
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body',
      cover: 'img/img2.png'
    },
    {
      id: 3,
      title: 'title 3',
      body: 'body',
      cover: 'img/img3.png'
    }
  ]
};
describe('<Posts />', () => {
  it('should render Posts', () => { 
    render(<Posts {...postsMock} />);
    
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);

    const lastImage = screen.getByRole('img', { name: /title 3/i });

    expect(lastImage).toHaveAttribute('src', 'img/img3.png');
  });

  it('should not render Posts', () => {
    render(<Posts />);
    
    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
  });

  it('should match to snapshot', () => {
    const { asFragment } = render(<Posts {...postsMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
});