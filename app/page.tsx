import Image from "next/image";
import {UserSessionInterFace} from "@/types/user";
import {getSession} from "@/lib/auth";

const session = await getSession();
export default function Home() {
  if (!session) {
    return
    <>
    </>
  }
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome user {session.firstName} {session.lastName}
      </h1>
    </div>
  );
}
