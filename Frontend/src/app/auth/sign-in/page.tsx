import { AppRoute } from "@/shared/enums/app-route.enums";
import SignInForm from "@/components/auth/sign-in-form/SignInForm";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper";

export default async function SignInPage() {
  return <AuthWrapper authPath={AppRoute.SIGN_UP} screen={<SignInForm />} />;
}
