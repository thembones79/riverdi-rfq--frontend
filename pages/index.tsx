import { IUser } from "./users";
import styles from "../styles/Home.module.scss";

interface LandingProps {
  currentUser: IUser;
  version: string;
}

const Landing = ({ currentUser, version }: LandingProps) => {
  return (
    <div>
      <h1 className={styles.title}>
        {currentUser ? `hi, ${currentUser.username}` : `please log in`}
      </h1>

      <div>version: {version}</div>
    </div>
  );
};

Landing.getInitialProps = ({ currentUser }: { currentUser: IUser }) => {
  return { version: "0.1.0", currentUser };
};

export default Landing;
