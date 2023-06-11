import { useSession } from "next-auth/react";

function Reportes() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>User not logged in</p>;
  }

  return (
    <div>
      <h1>{session.user.name}</h1>
      <p>{session.user.email}</p>
      <img src={session.user.image} alt="" />
    </div>
  );
}

export default Reportes;