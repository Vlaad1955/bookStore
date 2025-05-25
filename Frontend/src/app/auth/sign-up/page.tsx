import { AppRoute } from "@/shared/enums/app-route.enums";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper";
import SignUpForm from "@/components/auth/sign-up-form/SignUpForm";

export default async function SignInPage() {
  return <AuthWrapper authPath={AppRoute.SIGN_IN} screen={<SignUpForm />} />;
}
