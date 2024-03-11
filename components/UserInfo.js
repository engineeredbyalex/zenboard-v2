import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { data: session, status } = useSession();

    console.log("Session Status:", status);
    console.log("Session Data:", session);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-start justify-center w-full h-auto py-5">
            <h5> Welcome {session.user?.email}</h5>
            <p> Welcome, this is the state of {}</p>
        </div>
    );
}
