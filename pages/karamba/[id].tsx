import { NextPage } from "next";
import Router from "next/router";
import { ssrRequest } from "../../api/ssr-request";

interface Props {
  userAgent?: string;
  u?: any;
}

const Page: NextPage<Props> = ({ userAgent, u }) => (
  <main>
    <p>Your user agent: {userAgent}</p>

    <button onClick={() => Router.push("/karamba/5")}>Click</button>
  </main>
);

Page.getInitialProps = async (ctx) => {
  const userAgent = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;

  const id = ctx.query.id;
  console.log({ ctx });
  console.log({ id });

  const url = `/users/${id}`;
  const { data } = await ssrRequest(ctx, url);

  console.log({ userAgent, u: data });

  return { userAgent, u: data };
};

export default Page;
