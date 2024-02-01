import React, { useEffect, useState } from "react";
import { apiQueryUsers } from "apis/userApi";
import Button from "components/Button";
import { UserHeaderRow, UserFilterRow, UserRow, LoadingRow } from "./table";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ isAsc: true });
  const [isLoading, setIsLoading] = useState(false);
  const [refetchNum, setRefetchNum] = useState(0);

  const refetch = () => {
    setRefetchNum(refetchNum + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userList = await apiQueryUsers(filters);
        setUsers(userList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filters, refetchNum]);

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">User List</h1>
        <Button onClick={refetch} color="blue">
          Reload
        </Button>
      </header>

      <div className="mt-10 w-4/5">
        <UserHeaderRow />
        <UserFilterRow filters={filters} setFilters={setFilters} />
        {isLoading ? (
          <LoadingRow />
        ) : (
          users.map((user) => <UserRow key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}
