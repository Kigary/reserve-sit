const s4 = () => Math.random().toString(16).slice(-4);

export const createGUID = () =>
  s4() + s4() + '-' + s4() +
  '-' + s4() + '-' + s4() +
  '-' + s4() + s4() + s4();
