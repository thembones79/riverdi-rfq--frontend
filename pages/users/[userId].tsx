import type { AppContext } from "next/app";
import { ssrRequest } from "../../api/ssr-request";
import { IUser } from "./";

interface ShowUserProps {
  user: IUser;
}

const ShowUser = ({ user }: ShowUserProps) => {
  if (!user) {
    return <h1>User not found</h1>;
  } else {
    const { username, email } = user;
    return (
      <div>
        <div>{username}</div>
        <div>{email}</div>
      </div>
    );
  }
};

ShowUser.getInitialProps = async (ctx: AppContext["ctx"]) => {
  const { userId } = ctx.query;
  const url = `/users/${userId}`;
  const { data } = await ssrRequest(ctx, url);
  return { user: data };
};

export default ShowUser;
