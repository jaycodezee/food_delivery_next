// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     // adapter: PrismaAdapter(prisma),
// });
// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [Google],
// })

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})