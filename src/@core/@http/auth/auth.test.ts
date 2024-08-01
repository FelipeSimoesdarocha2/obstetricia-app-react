import axios, { AxiosResponse } from "axios";
import { IAuthResponse } from "../../models/authResponse";
import { IUserLogin } from "../../models/userLogin";
import auth from "./auth";

jest.mock("axios");

describe("Auth", () => {
  test("should call axios post correct", async () => {
    const user: IUserLogin = {
      password: "myverystringpassword",
      email: "myuser",
    };

    const result: IAuthResponse = {
      token: "token",
      message: "Logado com sucesso!",
      success: true,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios.post = jest.fn(() =>
      Promise.resolve({ data: result } as AxiosResponse<IAuthResponse>)
    );

    await auth.login(user);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/auth`,
      {
        password: "myverystringpassword",
        email: "myuser",
      }
    );
  });

  test("should return", async () => {
    const user: IUserLogin = {
      password: "myverystringpassword",
      email: "myuser",
    };

    const result: IAuthResponse = {
      token: "token",
      message: "Logado com sucesso!",
      success: true,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios.post = jest.fn(() =>
      Promise.resolve({ data: result } as AxiosResponse<IAuthResponse>)
    );

    const response = await auth.login(user);

    expect(response).toEqual(result);
  });
});
