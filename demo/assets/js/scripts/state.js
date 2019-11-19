const useState = (initialValue) => {
  let value = initialValue;
  let $cb = () => {};

  return {
    onChange: (cb) => $cb = cb,
    get: () => value,
    set: (newValue) => {
      value = newValue;
      $cb(value);
    },
  };
};
