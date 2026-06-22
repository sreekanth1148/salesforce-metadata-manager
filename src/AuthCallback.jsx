import { useEffect } from "react";

function AuthCallback() {
  useEffect(() => {
    const code = new URLSearchParams(
      window.location.search
    ).get("code");

    console.log("Authorization Code:", code);

    if (code) {
      fetch("https://salesforce-metadata-manager-api-sreekanth.onrender.com/token",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("TOKEN DATA:", data);

          localStorage.setItem(
            "access_token",
            data.access_token
          );

          localStorage.setItem(
            "instance_url",
            data.instance_url
          );

          alert("Login Successful");
        })
        .catch((err) => {
          console.error(err);
          alert("Token Error");
        });
    }
  }, []);

  return <h1>Auth Callback Page</h1>;
}

export default AuthCallback;