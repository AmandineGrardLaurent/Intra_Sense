import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../../../components/admin/adminProfile/AdminProfile";

export default function AdminPage() {
  const [data, setData] = useState<AdminType>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/role`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (data && !data.isAdmin) {
      navigate("/homepage");
    }
  }, [data, navigate]);

  return (
    <>
      <AdminProfile />
    </>
  );
}
