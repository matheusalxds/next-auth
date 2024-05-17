import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";
import {NextResponse} from "next/server";

export async function  GET() {
  const session = await getServerSession(authOptions);

  if (!session){
    return NextResponse.json({ error: 'not authorized'}, { status: 400})
  }

  return NextResponse.json({ success: session }, { status: 200 })
}
