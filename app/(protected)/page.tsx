
'use client'
import Spinner from "@/components/spinner";
import {useAppSelector} from "@/lib/hooks";

export default function Home() {
  // const session = await getSession();
  // const user = useAppSelector((state) => state.auth.user);
  const user = useAppSelector(
    (state) => state.auth.user,
  );

  if (!user?.id) {
    return (
      <div className={"flex items-center justify-center h-screen w-full"}>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold p-5 ">
        Welcome user {user?.firstName} {user?.lastName} !
      </h1>
    </div>
  );
}
