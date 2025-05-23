import { useCallback, useEffect, useState } from "react";
import { Element, Link } from "react-scroll";
import ApplicantsList from "../../../components/admin/applicantsList/ApplicantsList";
import UsersList from "../../../components/admin/usersList/UsersList";
import NavBar from "../../../components/navBar/NavBar";
import style from "./usersList.module.css";

export default function UsersListPage() {
  const [users, setUsers] = useState<UserListType[]>([]);
  const [applicants, setApplicants] = useState<UserListType[]>([]);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accepted`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/applicant`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
      });
  }, [refresh]);

  return (
    <>
      <Element name="top">
        <NavBar />
      </Element>
      <main className={style.main}>
        <h1 className={style.titleH1}>Administration des utilisateurs</h1>
        {applicants.length > 0 && (
          <section className={style.container}>
            <h2 className={style.titleApplicants}>Liste des postulants</h2>
            <article className={style.userContainer}>
              {applicants.map((applicant) => (
                <ApplicantsList
                  user={applicant}
                  key={applicant.id}
                  onChange={triggerRefresh}
                />
              ))}
            </article>
          </section>
        )}
        {users.length > 0 && (
          <section className={style.container}>
            <h2 className={style.titleUsers}>Liste des utilisateurs</h2>
            <article className={style.userContainer}>
              {users.map((user) => (
                <UsersList
                  user={user}
                  key={user.id}
                  onChange={triggerRefresh}
                />
              ))}
            </article>
          </section>
        )}
        <Link
          to="top"
          smooth={true}
          duration={500}
          className={style.buttonScrollToTop}
        >
          Revenir en haut
        </Link>
      </main>
    </>
  );
}
