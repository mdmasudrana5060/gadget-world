import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    console.log(email);
    useEffect(() => {
        if (email) {
            fetch(`https://gadget-world.onrender.com/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem('accessToken', data.accessToken);
                    setToken(data.accessToken);

                })
        }
    }, [email]);
    return [token];


}
export default useToken;