import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import Button from "./Button";
import Loader from "../loader/Loader";

describe("<Button />", () => {
  test("should render submit button type", () => {
    render(<Button isSubmit name="My Button" />);
    const buttonElement: HTMLButtonElement = screen.getByTestId("button");
    expect(buttonElement.type).toBe("submit");
  });

  test("should render button type", () => {
    render(<Button isSubmit={false} name="My Button" />);
    const buttonElement: HTMLButtonElement = screen.getByTestId("button");
    expect(buttonElement.type).toBe("button");
  });

  test("should render Loader when is loading", () => {
    const wrapper = shallow(<Button isSubmit name="My Button" loading />);

    const loader = wrapper.find(Loader);

    expect(loader.length).toBe(1);
    expect(wrapper.text()).toBe("<Loader />");
  });

  test("should render Loader when is loading", () => {
    const wrapper = shallow(<Button isSubmit name="My Button" />);

    const loader = wrapper.find(Loader);

    expect(loader.length).toBe(0);
    expect(wrapper.text()).toBe("My Button");
  });
});
