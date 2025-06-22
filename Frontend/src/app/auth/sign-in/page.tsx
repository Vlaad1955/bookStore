import AuthWrapper from "@/components/auth/auth-wrapper/AuthWrapper";
import SignInForm from "@/components/auth/sign-in-form/SignInForm";
import { AppRoute } from "@/features/auth/enums/app-route.enums";

export default async function SignInPage() {
  return <AuthWrapper authPath={AppRoute.SIGN_UP} screen={<SignInForm />} />;
}
