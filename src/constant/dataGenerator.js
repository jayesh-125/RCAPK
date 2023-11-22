import { faker } from "@faker-js/faker";
import { ADDUSERINDATABASE } from "../services/users";
import { ADDNEWRELATIONFROMDATABASE } from "../services/message";

export const generator = () => {
  for (let i = 0; i < 5; i++) {
    const user = {
      Email: faker.internet.email(),
      id: faker.string.uuid(),
      phoneNo: faker.phone.number(),
      profile_image: faker.image.avatar(),
      token: faker.string.alphanumeric(20),
      username: faker.internet.userName(),
      time: new Date(),
    };
    ADDUSERINDATABASE(user);
  }
};
export const messageGenerator = () => {
  for (let i = 0; i < 5; i++) {
    const user = {
      from_name: faker.internet.userName(),
      from_profile_image: faker.image.avatar(),
      from_user_id: faker.string.uuid(),
      last_message: faker.string.alpha(),
      last_time: faker.date.anytime(),
      message_number: faker.number.int(),
      to_profile_image: faker.image.avatar(),
      to_user_id: faker.string.uuid(),
      to_username: faker.internet.userName(),
    };
    ADDNEWRELATIONFROMDATABASE(user);
  }
};


export function GenerateUniqueId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 20;

  let uniqueId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}
