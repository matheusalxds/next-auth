import {ProfileForm} from "@/app/register/Forms/Form";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";
import {redirect} from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="w-[800px]">
      <ProfileForm />
    </div>
  );
}


