import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { SiVk } from "react-icons/si";
import styles from "./Table.module.css";
import { useStores } from "@/store/StoreContext";
import { Loader } from "../Loader";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

export const Table = observer(() => {
  const { userStore } = useStores();
  const { users, hasMore, fetchMoreUsers } = userStore;

  useEffect(() => {
    if (users.length === 0) {
      fetchMoreUsers();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <SiVk size={24} />
          <span className={styles.title}>VK Test App</span>
        </div>
        <button className={styles.addButton}>
          <MdFormatListBulletedAdd size={20} />
        </button>
      </div>

      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreUsers}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<p className={styles.end}>Все данные загружены</p>}
      >
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Возраст</th>
                <th>Статус</th>
                <th>Телефон</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <FaCircle
                      color={user.status === "active" ? "#00e676" : "#888"}
                      size={12}
                      title={user.status}
                    />
                  </td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
});
