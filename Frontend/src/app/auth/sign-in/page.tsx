import { AppRoute } from "@/shared/auth/enums/app-route.enums";
import SignInForm from "@/components/auth/sign-in-form/SignInForm";
import AuthWrapper from "@/components/auth/auth-wrapper/AuthWrapper";

export default async function SignInPage() {
  return <AuthWrapper authPath={AppRoute.SIGN_UP} screen={<SignInForm />} />;
}
