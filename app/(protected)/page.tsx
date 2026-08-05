
import {getSession} from "@/lib/auth";
import Spinner from "@/components/spinner";

const session = await getSession();
export default function Home() {
  if (!session?.id) {
    return (
      <Spinner />
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold p-5 ">
        Welcome user {session.firstName} {session.lastName} !
      </h1>
    </div>
  );
}
