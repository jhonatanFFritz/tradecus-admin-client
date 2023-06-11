import { getSession, signOut } from "next-auth/react";

function LoginPage({ session }) {
  console.log(session)
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Login Page</p>

      <div>
        {session ? (
          <div>
            <h1>{session.user.name}</h1>
            <p>{session.user.email} </p>
            <img src={session.user.image} alt="" />
          </div>
        ) : (
          <p>Esqueleton</p>
        )}
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded"
        onClick={() => signOut()}
      >
        Cerrar Sesión
      </button>
    </>
  );
}
// esto se ejecuta primero y si hayn error no devuelve la interfaz
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};

export default LoginPage;
