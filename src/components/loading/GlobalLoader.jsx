import { useState } from "react";
import Loading from "./Loading";
import { setAxiosLoader } from "../../utils/axios";

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  setAxiosLoader(setIsLoading);
  return isLoading && <Loading />;
};

export default GlobalLoader;
