import { arrayShuffle } from './array.js';

export const drawNamesIntoPairs = (users) => {
  const pairs = [];

  users = arrayShuffle([...users]);

  users.forEach((giver, index) => {
    const reciever = users[index + 1] || users[0];

    pairs.push({
      id: `${giver.id}${reciever.id}`,
      giver,
      reciever,
    });
  });

  return pairs;
};
