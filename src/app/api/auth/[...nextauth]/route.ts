

import { handler } from "klabban-commerce/auth";
import { KlabbanConfig } from "libs/klabbanConfig";

const authHandler = handler(KlabbanConfig);

// const authHandler = NextAuth(
//   {
//     session: {
//       strategy: 'jwt',
//       maxAge: 60 * 60 * 24 * 356
//     },
//     providers: [
//       CredentialsProvider({
//         name: "Sign in",
//         credentials: {
//           email: {
//             label: "Email",
//             type: "email",
//             placeholder: "example@example.com",
//           },
//           password: { label: "Password", type: "password" },
//         },
//         async authorize(credentials) {
//           if (!credentials?.email || !credentials.password) {
//             return null;
//           }
  
//           console.log("credentials ---- log", credentials)
  
//           const { login } = await loginRequest({
//             ...KlabbanConfig,
//             input: {
//               provider: LoginProviderEnum.Password,
//               credentials: {
//                 username: credentials?.email || "",
//                 password: credentials.password
//               }
//             },
//             option: {
//               fetch,
//               fetchOptions: {
//                 credentials: "include",
//                 mode: "cors",
//               },
//             }
//           })
//           console.log("login result", login);
  
//           if(!login) {
//             return null
//           }
  
          
//           return {
//             id: login.user?.id || "",
//             email: login.user?.email || "",
//             name: login.user?.nicename || "",
//             randomKey: "Hey cool",
//             accessToken: login.authToken,
//             refreshToken: login.refreshToken,
//             authTokenExpiration: login.authTokenExpiration,
//             refreshTokenExpiration: login.refreshTokenExpiration,
//           };
//         },
//       }),
//     ],
//     callbacks: {
//       async jwt ({ token, user, trigger, session }) {
//         if (trigger === "update" && session?.accessToken) {
//           // Note, that `session` can be any arbitrary object, remember to validate it!
//           console.log("jwt update trigger", session)
//           token.accessToken = session.accessToken
//         }
//         if (typeof user !== "undefined") {
//           // user has just signed in so the user object is populated
//           return user as unknown as JWT
//         }
//         return token
//       },
//       async session(props) {
//         const { session, token, trigger, newSession } = props;
//         console.log("sesstion start", props)
//         if (trigger === "update" && newSession?.newAccessToken) {
//           console.log("sesstion update")
//           // You can update the session in the database if it's not already updated.
//           // await adapter.updateUser(session.user.id, { name: newSession.name })
  
//           // Make sure the updated value is reflected on the client
//           session.accessToken = newSession.newAccessToken
//         }
//         return {
//           ...session,
//           accessToken: token.accessToken,
//           refreshToken: token.refreshToken,
//           authTokenExpiration: token.authTokenExpiration,
//           refreshTokenExpiration: token.refreshTokenExpiration
//         };
//       },
//     },
//   }
// );

export { authHandler as GET, authHandler as POST };