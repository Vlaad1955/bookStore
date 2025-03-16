"use client";

import { AppRoute } from "@/shared/enums/app-route.enums";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignInPage() {
  return (
    <AuthWrapper
      authPath={AppRoute.SIGN_IN}
      screen={<SignUpForm onSubmit={(data) => console.log("Login:", data)} />}
    />
  );
}
