import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

test("should have Password label text content", () => {
  render(
    <Input
      type="password"
      placeholder="Type a password"
      label="Password"
      id="password"
      onChange={() => ({})}
    />
  );
  const labelElement = screen.getByTestId("password-label");
  expect(labelElement.textContent).toBe("Password");
});

test("should render a input with password type", () => {
  render(
    <Input
      type="password"
      placeholder="Type a password"
      label="Password"
      id="password"
      onChange={() => ({})}
    />
  );
  const inputElement: HTMLInputElement = screen.getByTestId("password");
  expect(inputElement.type).toBe("password");
  expect(inputElement.placeholder).toBe("Type a password");
});
