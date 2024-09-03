import React, { useEffect, useState, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { fetchUsers } from "./users/usersSlice";
import { RootState } from "../app/store";

interface SearchState {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const status = useAppSelector((state: RootState) => state.users.status);

  const [search, setSearch] = useState<SearchState>({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleSearchChange =
    (key: keyof SearchState) => (event: ChangeEvent<HTMLInputElement>) => {
      setSearch({ ...search, [key]: event.target.value });
    };

  const filteredUsers = users.filter((user: User) =>
    Object.keys(search).every((key) => {
      const userValue = user[key as keyof User];
      const searchValue = search[key as keyof SearchState];

      if (typeof userValue === "string" && typeof searchValue === "string") {
        return userValue.toLowerCase().includes(searchValue.toLowerCase());
      }

      return false;
    })
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Table</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <input
          className="border p-2"
          placeholder="Name"
          value={search.name}
          onChange={handleSearchChange("name")}
        />
        <input
          className="border p-2"
          placeholder="Username"
          value={search.username}
          onChange={handleSearchChange("username")}
        />
        <input
          className="border p-2"
          placeholder="Email"
          value={search.email}
          onChange={handleSearchChange("email")}
        />
        <input
          className="border p-2"
          placeholder="Phone"
          value={search.phone}
          onChange={handleSearchChange("phone")}
        />
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: User) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.username}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
