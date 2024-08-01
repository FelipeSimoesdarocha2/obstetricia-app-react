import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import LoginContentContainer from "./RecoverPasswordCreateContentContainer";
import CreateForm from "../form/CreateForm";

describe("<LoginContentContainer />", () => {
  test("should be render LoginForm", () => {
    const wrapper = mount(
      <BrowserRouter>
        <LoginContentContainer />
      </BrowserRouter>
    );
    expect(wrapper.find(CreateForm).length).toBe(1);
  });

  test("toggle show forgot password", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <LoginContentContainer />
      </BrowserRouter>
    );

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });

    act(() => {
      wrapper.update();
    });

    expect(wrapper.find(CreateForm).length).toBe(0);

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });

    act(() => {
      wrapper.update();
    });

    expect(wrapper.find(CreateForm).length).toBe(1);
  });
});
