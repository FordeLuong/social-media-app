// Trang đăng nhập

import { useState } from "react";

export default function Login(){
    // Khai báo form data
    const[formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.targer.na]
        })
    }


}