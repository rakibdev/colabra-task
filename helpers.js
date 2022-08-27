const chance = percent => {
  return Math.random() < percent / 100;
};

export { chance };
