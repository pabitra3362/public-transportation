import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/userManagement.service";
import { toast, ToastContainer } from "react-toastify";
import CustomModal from "../components/Modal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleBanBtn = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success("Driver banned successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredUsers = searchUser
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
          user.email.toLowerCase().includes(searchUser.toLowerCase())
      )
    : users;

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 flex items-center gap-2">
                <CustomModal user={user} />
                <button
                  onClick={() => handleBanBtn(user._id)}
                  className="bg-red-500 text-white px-2 w-28 py-2 rounded ml-2"
                >
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
