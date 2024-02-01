import React, { useEffect, useState } from "react";
import { apiQueryUsers } from "apis/userApi";
import Button from "components/Button";
import { UserHeaderRow, UserFilterRow, UserRow } from "./table";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ isAsc: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await apiQueryUsers(filters);
        setUsers(userList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">User List</h1>
        <Button onClick={() => {}} color="blue">
          Reload
        </Button>
      </header>

      <div className="mt-10 w-4/5">
        <UserHeaderRow />
        <UserFilterRow filters={filters} setFilters={setFilters} />
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
