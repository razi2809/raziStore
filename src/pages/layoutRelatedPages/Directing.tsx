import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
const Directing = () => {
  const navigate = useNavigate();
  //direct the user on open to diffrent route depends on whether he loggin alredy
  useEffect(() => {
      window.scrollTo({ top: 0, left: 0 });
      navigate(ROUTER.HOME);
  }, []);
  return null
};
export default Directing;