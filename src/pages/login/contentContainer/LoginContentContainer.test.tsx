import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import LoginContentContainer from "./LoginContentContainer";
import LoginForm from "../form/LoginForm";
import ForgotPassword from "../forgotPassword/ForgotPassword";

describe("<LoginContentContainer />", () => {
  test("should be render LoginForm", () => {
    const wrapper = mount(
      <BrowserRouter>
        <LoginContentContainer />
      </BrowserRouter>
    );
    expect(wrapper.find(LoginForm).length).toBe(1);
  });

  test("toggle show forgot password", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <LoginContentContainer />
      </BrowserRouter>
    );
    act(() => {
      wrapper.find(LoginForm).props().onClickForgotPassword();
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });

    act(() => {
      wrapper.update();
    });

    expect(wrapper.find(LoginForm).length).toBe(0);
    expect(wrapper.find(ForgotPassword).length).toBe(1);

    act(() => {
      wrapper.find(ForgotPassword).props().onClickGoBack();
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });

    act(() => {
      wrapper.update();
    });

    expect(wrapper.find(LoginForm).length).toBe(1);
    expect(wrapper.find(ForgotPassword).length).toBe(0);
  });
});
