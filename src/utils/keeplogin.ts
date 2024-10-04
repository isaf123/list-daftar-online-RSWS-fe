import axios from "axios";
export const keepLogin = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}auth/keeplogin?token=${token}`
    );
    console.log(result);

    return true;
  } catch (error) {
    return false;
  }
};
