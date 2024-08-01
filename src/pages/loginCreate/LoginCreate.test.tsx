import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginCreate from "./LoginCreate";

describe("Login", () => {
  test("should be render logo", () => {
    render(
      <BrowserRouter>
        <LoginCreate />
      </BrowserRouter>
    );
    const loginImageElement: HTMLImageElement = screen.getByAltText("Logo");
    expect(loginImageElement.src).toBe("http://localhost/Logo.png");
    expect(loginImageElement).toBeInTheDocument();
  });

  test("should be render logo short", () => {
    render(
      <BrowserRouter>
        <LoginCreate />
      </BrowserRouter>
    );
    const loginImageElement: HTMLImageElement =
      screen.getByAltText("Logo Short");
    expect(loginImageElement.src).toBe("http://localhost/Logo_Short.png");
    expect(loginImageElement).toBeInTheDocument();
  });
});
