import { createId } from './../../utils/id.js';

export const FIELDS = {
  name: {
    label: `Name`,
    placeholder: `Arthur Christmas`,
    required: true,
  },
  email: {
    label: `Email`,
    placeholder: `naughtyornice@north.pole`,
    required: true,
    type: `email`,
  },
};

export const STEPS = {
  names: {
    title: `Fill the hat`,
  },
  conditions: {
    title: `Set the rules`,
  },
  draw: {
    title: `Draw the names`,
  },
};

export const PREFILLED_DATA = {
  users: [
    {
      id: createId(),
      name: `Rob`,
      email: `sterlini@fueled.com`,
    },
    {
      id: createId(),
      name: `Tom`,
      email: `tom@fueled.com`,
    },
    {
      id: createId(),
      name: `Joe`,
      email: `jr@fueled.com`,
    },
  ],
};
