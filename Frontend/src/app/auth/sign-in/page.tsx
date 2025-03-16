"use client";

import { AppRoute } from "@/shared/enums/app-route.enums";
import SignInForm from "@/components/auth/SignInForm";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function SignInPage() {
  
  return (
    <AuthWrapper
      authPath={AppRoute.SIGN_UP}
      screen={<SignInForm onSubmit={(data) => console.log("Login:", data)} />}
    />
  );
}
