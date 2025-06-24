import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

export async function getAllUsers(queryParams: { page: number }) {
    const response = await axiosInstance.get("/users/list", {
        params: queryParams,
    });
    return response.data;
}

export async function updateUserRole(id: string) {
    const response = await axiosInstance.patch(`/users/role/${id}`);
    return response.data;
}