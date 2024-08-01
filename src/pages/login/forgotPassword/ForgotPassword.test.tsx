import React from "react";
import { shallow } from "enzyme";
import ForgotPassword from "./ForgotPassword";
import Input from "../../../components/input/Input";

describe("ForgotPassword", () => {
  test("should render a Input email", () => {
    const wrapper = shallow(<ForgotPassword onClickGoBack={() => ({})} />);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Input).get(0).props.type).toBe("email");
    expect(wrapper.find(Input).get(0).props.placeholder).toBe(
      "Informe o email para recuperar a senha"
    );
    expect(wrapper.find(Input).get(0).props.label).toBe("Email");
    expect(wrapper.find(Input).get(0).props.id).toBe("email");
  });
});
