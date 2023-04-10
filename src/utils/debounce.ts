export const debounce = (fn: any, ms = 300) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function(ctx: any, ...args: any[]) {
    const fnCall = () => {
      fn.apply(ctx, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
