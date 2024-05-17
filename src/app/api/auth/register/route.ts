import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("data", { email, password });
    return NextResponse.json({ success: "acc created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: "acc created" }, { status: 200 });
  }
}
