import { faker } from "@faker-js/faker";
import { addUser } from "../services/users";
import { addMessages } from "../services/message";

// export const generator = () => {
//   for (let i = 0; i < 20; i++) {
//     const user = {
//       Email: faker.internet.email(),
//       id: faker.string.uuid(),
//       phoneNo: faker.phone.number(),
//       profile_image: faker.image.avatar(),
//       token: faker.string.alphanumeric(20),
//       username: faker.internet.userName(),
//     };
//     addUser(user);
//   }
// };
// export const messageGenerator = () => {
//   for (let i = 0; i < 20; i++) {
//     const user = {
//       from_name: faker.internet.userName(),
//       from_profile_image: faker.image.avatar(),
//       from_user_id: faker.string.uuid(),
//       last_message: faker.string.alpha(),
//       last_time: faker.date.anytime(),
//       message_number: faker.number.int(),
//       to_profile_image: faker.image.avatar(),
//       to_user_id: faker.string.uuid(),
//       to_username: faker.internet.userName(),
//     };
//     // addMessages(user);
//   }
//   return userData;
// };
