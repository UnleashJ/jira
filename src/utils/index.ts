import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown):boolean => {
  return value === 0 ? false : !value;
}

export const isVoid = (value: unknown): boolean => {
  return value === undefined || value === null || value === ''
} 

// {[key:string]:unknown} 索引类型
export const cleanObject = (object: {[key:string]:unknown}) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb:() => void) => {
  // 依赖项加上cb会造成无限循环
  useEffect(cb, []);
};

// 防抖，包装一个参数value，返回一个新参数debouncedParam。
// 连续改变value，间隔delay毫秒及以上，才真的改变value
export const useDebounce = <T> (value: T, delay:number = 200) => {
  const [param, setParam] = useState(value);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setParam(value);
    }, delay);
    return () => clearTimeout(timerId); // 利用useEffect清除副作用的特点，在下一次执行前清除定时器
  }, [value, delay]);

  return param;
};

// 数组操作
export const useArray = <T> (array: T[]) => {
  const [value, setValue] = useState(array)
  const add = (item: T) => {
    setValue([...value, item])
  }
  const clear = () => {
    setValue([])
  }
  const removeIndex = (index:number) => {
    setValue(state => {
      state.splice(index, 1) // splice返回被修改的内容
      return state
    })
  }

  return {
    value,
    setValue,
    add,
    clear,
    removeIndex,
  }
}

export const useDocumentTitle = (title: string, keepOnUnmount:boolean = true) => {
  const oldTitle = useRef(document.title)
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    let copyValue = oldTitle.current
    return () => {
      if(!keepOnUnmount) {
        document.title = copyValue
      }
    }
  }, [keepOnUnmount, oldTitle ])
}