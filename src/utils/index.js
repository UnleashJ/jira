import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb) => {
  useEffect(cb, []);
};

// 防抖，包装一个参数value，返回一个新参数debouncedParam。
// 连续改变value，间隔delay毫秒及以上，才真的改变value
export const useDebounce = (value, delay = 500) => {
  const [param, setParam] = useState(value);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setParam(value);
    }, delay);
    return () => clearTimeout(timerId); // 利用useEffect清除副作用的特点，在下一次执行前清除定时器
  }, [value, delay]);

  return param;
};
