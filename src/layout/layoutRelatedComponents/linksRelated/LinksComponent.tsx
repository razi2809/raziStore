import { FC, memo } from "react";
import { links } from "./links";
import { Iuser } from "../../../@types/user";
import NavLinkComponent from "./NavComponents";

const { alwaysLinks, loggedinLinks, loggedoutLinks, adminType, businessType } =
  links;
interface Props {
  loggedin: boolean;
  userInfo: Iuser | null;
}
const LinksComponent: FC<Props> = ({ loggedin, userInfo }) => {
  return (
    <>
      {loggedin && <NavLinkComponent links={loggedinLinks} />}
      {!loggedin && <NavLinkComponent links={loggedoutLinks} />}
      {/* {alwaysLinks.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={myItem.to}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      
      {userInfo &&
        userInfo.isBusiness &&
        businessType.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={myItem.to}>
            {myItem.children}
          </NavLinkComponent>
        ))}*/}
      {userInfo && userInfo.isAdmin && <NavLinkComponent links={adminType} />}
    </>
  );
};

export default memo(LinksComponent);
