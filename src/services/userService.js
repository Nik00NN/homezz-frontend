export const getAllUsers = async () => {
    const response = await fetch("http://localhost:8080/api/users");
    return await response.json();
}