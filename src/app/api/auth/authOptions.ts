import {NextAuthOptions, User} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {tmpUser} from "@/tmp-user";

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req): Promise<User | null> {

        if (credentials?.email === tmpUser.email && credentials.password === tmpUser.pass) {
          return { id: '1', email: tmpUser.email }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({user, token, trigger, session}) => {
      if (trigger === 'update') {
        return { ...token, ...session.user}
      }
      return { ...token, ...user}
    }
  }
}
