"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/shared/auth/auth-store/use-auth-store";
import {useUserStore} from "@/user/user/store/UseUserStore";

interface Props {
    allowedRoles: string[];
    children: React.ReactNode;
}

export const ProtectedRouteRole = ({allowedRoles, children}: Props) => {
    const router = useRouter();
    const {isAuthenticated, isLoading: authLoading} = useAuthStore();
    const {user, loadUser} = useUserStore();

    const [userLoading, setUserLoading] = useState(!user);

    useEffect(() => {
        const fetchUser = async () => {
            if (!user) {
                setUserLoading(true);
                await loadUser();
                setUserLoading(false);
            }
        };
        fetchUser();
    }, [user, loadUser]);

    const role = user?.role;

    useEffect(() => {
        if (!authLoading || !userLoading) {
            if (!isAuthenticated) {
                router.push("/auth/sign-in");
            } else if (!role || !allowedRoles.includes(role)) {
                router.push("/403");
            }
        }
    }, [authLoading, userLoading, isAuthenticated, role, router, allowedRoles]);

    if (authLoading || userLoading || !isAuthenticated || !role) {
        return <p>Завантаження...</p>;
    }

    return <>{children}</>;
};
