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

      if (!skipTokenTest) {
        return await axios
          .get(`/users/${dataFromToken.userId}`)
          .then(function (res) {
            // when log in successfully run this block
            // return the data of the user
            dispatch(authActions.login(res.data.user));
            return { user: res.data.user as Iuser, authorized: true };
          })
          .catch(function (e) {
            // when log in failed run this block
            //ade send the resulte
            return { err: e, authorized: false };
          });
      }
    } catch (err) {
      // when there was error unrelated to the server like invailed token
      return { err: "token decode failed plese log in", authorized: false };
    }
    return null;
  };
};

export default useAutoLogin;
