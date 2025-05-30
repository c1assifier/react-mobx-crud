import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { SiVk } from "react-icons/si";
import { MdFormatListBulletedAdd, MdDelete, MdEdit } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { RiToolsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "./Table.module.css";
import { useStores } from "@/store/StoreContext";
import { Loader } from "../Loader";

export const Table = observer(() => {
  const { userStore } = useStores();
  const { users, hasMore, fetchMoreUsers, deleteUser } = userStore;

  useEffect(() => {
    if (users.length === 0) {
      fetchMoreUsers();
    }
  }, [users.length, fetchMoreUsers]);

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить пользователя?")) {
      deleteUser(id);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <SiVk size={24} />
          <span className={styles.title}>VK Test App</span>
        </div>
        <Link to="/add" className={styles.addButton}>
          <MdFormatListBulletedAdd size={20} />
        </Link>
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
                <th>
                  <RiToolsFill size={20} />
                </th>
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
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        to={`/edit/${user.id}`}
                        className={styles.actionButton}
                        title="Редактировать"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleDelete(user.id)}
                        title="Удалить"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
});
