import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
  ]
})

export {handler as GET, handler as POST}