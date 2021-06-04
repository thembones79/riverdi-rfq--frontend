import Link from "next/link";
import { useRouter } from "next/router";
import { IUser } from "../pages/users";
import styles from "../styles/Header.module.scss";

interface HeaderProps {
  currentUser: IUser;
}

export const Header = ({ currentUser }: HeaderProps) => {
  const router = useRouter();

  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Log In", href: "/auth/login" },
    currentUser && { label: "Banana", href: "/auth/banana" },
    currentUser && { label: "Users", href: "/users" },
    currentUser && { label: "Users Table", href: "/users/table" },
    currentUser && { label: "Log Out", href: "/auth/logout" },
  ]
    .filter((truthyLink) => truthyLink)
    //@ts-ignore
    .map(({ label, href }) => {
      return (
        <li key={href} className={router.pathname === href ? "is-active" : ""}>
          <Link href={href}>{label}</Link>
        </li>
      );
    });

  return (
    <div className="tabs is-right is-boxed  m-3 sticky-navbar">
      <ul>
        <li className={styles.logo}>
          <div className={styles.logo__item}>
            <Link href="/">Riverdi RFQ</Link>
          </div>
        </li>
        {links}
      </ul>
    </div>
  );
};
