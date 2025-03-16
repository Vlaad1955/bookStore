// import SignInForm from "./sign-in/page";
// import SignUpForm from "./sign-up/page";
// import { AppRoute } from "@/shared/enums/app-route.enums";
// import { getText } from "@/shared/helpers/get-text-to-path/get-text-to-path";

// interface AuthProps {
//   authType: (typeof AppRoute)[keyof typeof AppRoute];
//   setAuthType: (type: (typeof AppRoute)[keyof typeof AppRoute]) => void;
// }

// const Auth: React.FC<AuthProps> = ({ authType, setAuthType }) => {
//   return (
//     <div>
//       <h2 style={{ color: "black" }}>{getText(authType, "title")}</h2>

//       {authType === AppRoute.SIGN_IN ? (
//         <SignInForm onSubmit={(data) => console.log("Login:", data)} />
//       ) : (
//         <SignUpForm onSubmit={(data) => console.log("Register:", data)} />
//       )}

//       <p style={{ color: "black" }}>
//         {getText(authType, "authText")}{" "}
//         <button
//           onClick={() =>
//             setAuthType(
//               authType === AppRoute.SIGN_IN
//                 ? AppRoute.SIGN_UP
//                 : AppRoute.SIGN_IN
//             )
//           }
//         >
//           {getText(authType, "authLink")}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Auth;
