import { render, screen } from "@testing-library/react";
import { TextInput } from ".";

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput onChange={fn} searchValue={'testando...'} />);
  
    const input = screen.getByPlaceholderText(/search here/i);
    expect(input.getAttribute('placeholder')).toBe("Search here");
  });

  // it('should call handleChange function on each key pressed', () => {
  //   const fn = jest.fn();
  //   render(<TextInput handleChange={fn} />);

  //   const input = screen.getByPlaceholderText(/Search here/i);
  //   const value = 'value';

  //   userEvent.type(input, value);

  //   expect(input.value).toBe(value);
  //   expect(fn).toHaveBeenCalledTimes(value.length;
  // });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { asFragment } = render(<TextInput handleChange={fn} />);
  
    expect(asFragment()).toMatchSnapshot();
  });
});