import { getTokensInfo } from "./tokenService";
import axios from "axios";

describe("getTokensInfo", () => {
  axios.get = jest
    .fn()
    .mockResolvedValue({ data: { items: [], totalCount: 10 } });

  test("should generate a function when it calls", () => {
    expect(getTokensInfo).toBeInstanceOf(Function);
  });

  test("should generated function call api with proper args", async () => {
    await getTokensInfo();

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
