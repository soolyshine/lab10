import { useGetUsersQuery, useAddUserMutation } from '../api/apiSlice';
import { useState } from 'react';

export default function UserList() {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && job) {
      await addUser({ name, job });
      setName('');
      setJob('');
    }
  };

  if (isLoading) return <p>Loading..</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users?.map((user, index) => (
          <li key={index}>{user.name} — {user.job}</li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Profession" value={job} onChange={(e) => setJob(e.target.value)}/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
