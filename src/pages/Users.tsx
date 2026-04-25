import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

type User = {
  id: string;
  name: string;
  email: string;
  isLocal?: boolean;
};


const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return data.map((u: any) => ({
    id: "A" + u.id,
    name: u.name,
    email: u.email,
    isLocal: false,
  }));
};

export default function Users() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const isCurrentUser = (email: string) =>
    currentUser?.email?.toLowerCase() === email.toLowerCase();

  
  const generateId = () => {
    const existing = JSON.parse(localStorage.getItem("localUsers") || "[]");
    return `U${100 + existing.length}`;
  };

  
  useEffect(() => {
    if (data) {
      const localUsers = JSON.parse(
        localStorage.getItem("localUsers") || "[]"
      );

      const formattedLocal = localUsers.map((u: any, i: number) => ({
        id: `U${100 + i}`,
        name: u.name,
        email: u.email,
        isLocal: true,
      }));

      setUsers([...formattedLocal, ...data]);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  
  const handleAdd = () => {
    if (!currentUser) {
      toast.error("Login required ❌");
      navigate({ to: "/login" });
      return;
    }

    if (!newName || !newEmail) {
      toast.error("Fill all fields ❗");
      return;
    }

    if (
      newName.toLowerCase() !== currentUser.name.toLowerCase() ||
      newEmail.toLowerCase() !== currentUser.email.toLowerCase()
    ) {
      toast.error("You can only add your own account ❌");
      return;
    }

    const exists = users.some(
      (u) => u.email.toLowerCase() === currentUser.email.toLowerCase()
    );

    if (exists) {
      toast.error("User already exists ⚠️");
      return;
    }

    const newUser: User = {
      id: generateId(),
      name: newName,
      email: newEmail,
      isLocal: true,
    };

    setUsers([newUser, ...users]);

    const existing = JSON.parse(localStorage.getItem("localUsers") || "[]");
    localStorage.setItem(
      "localUsers",
      JSON.stringify([...existing, newUser])
    );

    toast.success("User added successfully ✅");

    setNewName("");
    setNewEmail("");
  };

  
 const handleDelete = (id: string) => {
  if (!confirm("Delete this user?")) return;

  
  setUsers((prev) => prev.filter((u) => u.id !== id));

  
  const existing = JSON.parse(localStorage.getItem("localUsers") || "[]");

  const updatedLocal = existing.filter((_: any, index: number) => {
    const generatedId = `U${100 + index}`;
    return generatedId !== id;
  });

  localStorage.setItem("localUsers", JSON.stringify(updatedLocal));

  toast.success("Deleted permanently 🗑️");
};

  
  const startEdit = (u: User) => {
    setEditId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
  };

  const handleUpdate = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editId ? { ...u, name: editName, email: editEmail } : u
      )
    );

    setEditId(null);
    toast.success("Updated ✨");
  };


  let filtered = users.filter((u) => {
    const key = search.toLowerCase();
    return (
      u.id.toLowerCase().includes(key) ||
      u.name.toLowerCase().includes(key) ||
      u.email.toLowerCase().includes(key)
    );
  });

  
  if (filter === "local") filtered = filtered.filter((u) => u.isLocal);
  if (filter === "api") filtered = filtered.filter((u) => !u.isLocal);

  
  const getIdNum = (id: string) => parseInt(id.slice(1));

  filtered = [...filtered].sort((a, b) =>
    sortAsc
      ? getIdNum(a.id) - getIdNum(b.id)
      : getIdNum(b.id) - getIdNum(a.id)
  );

  
  const totalPages = Math.ceil(filtered.length / usersPerPage);
  const paginated = filtered.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error</p>;

  return (
    <div className="min-h-screen p-6">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto">

        
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-gray-700 font-semibold">
            Logged in as: {currentUser?.name}
          </h2>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              navigate({ to: "/login" });
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-5">
          Users Dashboard 🚀
        </h1>

        
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search ID / Name / Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="local">Your Users</option>
            <option value="api">API Users</option>
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-indigo-500 text-white px-3 rounded"
          >
            {sortAsc ? "ID ↑" : "ID ↓"}
          </button>
        </div>

        
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Enter your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Enter your email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAdd}
            disabled={!currentUser}
            className={`px-4 rounded text-white ${
              currentUser
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add User
          </button>
        </div>

        
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No users found 😢
                </td>
              </tr>
            ) : (
              paginated.map((u) => (
                <tr
                  key={u.id}
                  className={`text-center border-t ${
                    isCurrentUser(u.email)
                      ? "bg-blue-100 font-semibold"
                      : ""
                  }`}
                >
                  <td>{u.id}</td>

                  <td>
                    {editId === u.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1"
                      />
                    ) : (
                      <>
                        {u.name}
                        {isCurrentUser(u.email) && (
                          <span className="ml-2 text-xs text-blue-600">
                            (You)
                          </span>
                        )}
                      </>
                    )}
                  </td>

                  <td>
                    {editId === u.id ? (
                      <input
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border p-1"
                      />
                    ) : (
                      u.email
                    )}
                  </td>

                  <td className="space-x-2">
                    {editId === u.id ? (
                      <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(u)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        
        <div className="flex justify-center mt-5 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Prev
          </button>

          <span className="font-semibold">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}