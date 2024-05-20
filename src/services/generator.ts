export const GenerateUniqueId = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 20;

  let uniqueId: string = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}
