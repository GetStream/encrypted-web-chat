import chatClient from "./chatClient";

export default async (id, keyPair) => {
  const response = await chatClient.setUser(
    {
      id,
      name: id,
      image: `https://getstream.io/random_png/?id=cool-recipe-9&name=${id}`,
    },
    chatClient.devToken(id)
  );

  if (
    response.me?.publicKeyJwk &&
    response.me.publicKeyJwk != JSON.stringify(keyPair.publicKeyJwk)
  ) {
    await chatClient.disconnect();
    throw "This user id already exists with a different key pair. Choose a new user id or paste the correct key pair.";
  }

  await chatClient.upsertUsers([
    { id, publicKeyJwk: JSON.stringify(keyPair.publicKeyJwk) },
  ]);
};
