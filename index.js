const CLIENT_ID = "seu-client-id-aqui";
const REDIRECT_URI = "http://localhost:8000/callback.html";

function getToken() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:seu-client-secret-aqui`)}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("expires_in", data.expires_in);
        localStorage.setItem("refresh_token", data.refresh_token);
      })
      .catch((error) => console.error(error));
  }
}

function getUser() {
  const accessToken = localStorage.getItem("access_token");

  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

getToken();
