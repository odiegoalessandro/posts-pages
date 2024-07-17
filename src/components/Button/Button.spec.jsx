import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

afterEach(cleanup);

describe("<Button />", () => {
  it('should render the button with the text "test"', () => {
    const fn = jest.fn();
    
    render(<Button text="test" onClick={fn} />);

    const button = screen.getByRole('button', { name: /test/i });
    
    userEvent.click(button);
    
    expect(fn).toHaveBeenCalledTimes(1);
    expect(button).toBeInTheDocument();
  });


  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled={true} text="test" />);

    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toBeDisabled();
  });

  it('should be match snapshot', () => {
    const { asFragment } = render(<Button text="test" />);

    expect(asFragment()).toMatchSnapshot();
  });
});