// Defina suas credenciais do Spotify
const CLIENT_ID = "8c33166ce6ca49dd9965dce307849487";
const REDIRECT_URI = "https://SpotStats.github.io";

// Crie um objeto de autenticação
const auth = {
  accessToken: null,
  expiresAt: null,
  scope: "user-read-email user-read-private",
  showDialog: true,
  setAccessToken: function (accessToken) {
    this.accessToken = accessToken;
    this.expiresAt = Date.now() + 3600 * 1000; // 1 hora
  },
};

// Recupere o botão de autenticação
const authButton = document.getElementById("auth-button");

// Adicione um ouvinte de eventos ao botão de autenticação
authButton.addEventListener("click", () => {
  // Redirecione o usuário para a página de autorização do Spotify
  window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${auth.scope}&response_type=token&show_dialog=${auth.showDialog}`;
});

// Verifique se o usuário retornou da página de autorização do Spotify
if (window.location.hash) {
  // Analise os parâmetros da URL para recuperar o token de acesso
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get("access_token");
  const expiresIn = params.get("expires_in");
  const tokenType = params.get("token_type");

  // Salve o token de acesso no objeto de autenticação
  auth.setAccessToken(accessToken);

  // Faça uma solicitação à API do Spotify para recuperar o perfil do usuário
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Exiba as informações do perfil do usuário na página HTML
      const userProfile = document.getElementById("user-profile");
      userProfile.innerHTML = `
      <h2>Olá, ${data.display_name}!</h2>
      <p>Email: ${data.email}</p>
      <p>País: ${data.country}</p>
    `;
    })
    .catch((error) => {
      console.error(error);
    });
}
