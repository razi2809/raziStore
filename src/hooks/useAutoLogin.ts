import axios from "axios";
import { getToken } from "../services/tokenService";
import { ITokenPayload } from "../@types/inputs";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../REDUX/bigPie";
import { authActions } from "../REDUX/authSlice";
import { Iuser } from "../@types/user";

const useAutoLogin = () => {
  const dispatch = useAppDispatch();

  return async (skipTokenTest = false) => {
    try {
      const tokenoOBj = getToken();
      if (!tokenoOBj.token) return null; // if no token dont even run the function and return null
      const dataFromToken = jwtDecode<ITokenPayload>(tokenoOBj.token);

      if (skipTokenTest) return null;
      try {
        const res = await axios.get(`/users/${dataFromToken.userId}`);
        dispatch(authActions.login(res.data.user));
        return {
          user: res.data.user as Iuser,
          authorized: true,
          local: tokenoOBj.local,
        };
      } catch (error) {
        let errorMessage: string;

        if (axios.isAxiosError(error) && error.response) {
          // If it's an Axios error with a response
          errorMessage = error.response.data.message;
        } else if (error instanceof Error) {
          // If it's a standard JS Error, use its message

          errorMessage = error.message;
        } else {
          // For any other type of error,  generic message
          errorMessage = "An unknown error occurred";
        }

        return { err: errorMessage, authorized: false };
      }
    } catch (err) {
      // when there was error unrelated to the server like invailed token
      return { err: "token decode failed please log in", authorized: false };
    }
  };
};

export default useAutoLogin;
