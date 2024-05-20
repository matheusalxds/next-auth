import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";
import {tmpUser} from "@/tmp-user";

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ success: "not authorized"}, { status: 401 })
    }

    // basic update but, you could
    // connect to db and do something
    tmpUser.email = email

    return NextResponse.json({ success: "email updated" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: "email updated" }, { status: 200 });
  }
}
