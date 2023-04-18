// Importando a biblioteca do Spotify
import SpotifyWebApi from "spotify-web-api-js";

// Criando uma instância da biblioteca do Spotify
const spotifyApi = new SpotifyWebApi();

// Autenticando o usuário
const authenticate = () => {
  // Redirecionando para a página de autenticação do Spotify
  window.location.href =
    "https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&redirect_uri=REDIRECT_URI";
};

// Recuperando o token de acesso do usuário
const getToken = () => {
  // Recuperando o hash da URL
  const hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams.access_token;
};

// Recuperando as informações da conta do usuário
const getUserProfile = async () => {
  // Autenticando a instância da API do Spotify
  spotifyApi.setAccessToken(getToken());
  // Recuperando as informações do usuário
  const userProfile = await spotifyApi.getMe();
  return userProfile;
};

// Renderizando as informações do usuário na página
const renderUserProfile = (userProfile) => {
  // Selecionando o elemento HTML onde as informações serão exibidas
  const userProfileContainer = document.querySelector("#user-profile");
  // Renderizando as informações do usuário na página
  userProfileContainer.innerHTML = `
    <img src="${userProfile.images[0].url}" alt="${userProfile.display_name}">
    <h2>${userProfile.display_name}</h2>
    <p>Seguidores: ${userProfile.followers.total}</p>
    <p>País: ${userProfile.country}</p>
  `;
};

// Adicionando um evento de clique para o botão de login
document.querySelector("#login-button").addEventListener("click", () => {
  authenticate();
});

// Recuperando as informações do usuário e renderizando na página
getUserProfile()
  .then((userProfile) => {
    renderUserProfile(userProfile);
  })
  .catch((error) => {
    console.error(error);
  });
