import { NextPage } from "next";
import Router from "next/router";

interface Props {
  userAgent?: string;
}

const Page: NextPage<Props> = ({ userAgent }) => (
  <main>
    Your user agent: {userAgent}
    <button onClick={() => Router.push("/karamba/5")}>Click</button>
  </main>
);

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  console.log({ userAgent });
  return { userAgent };
};

export default Page;
