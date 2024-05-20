import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";
import {redirect} from "next/navigation";
import {DashboardForm} from "@/app/dashboard/Forms/Form";

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const user = session.user

  return (
    <div className="w-[800px]">
      <h1>Welcome back, {user?.email}</h1>

      <DashboardForm email={session?.user?.email as string} />
    </div>
  );
}


