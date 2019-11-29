import Cookies from "js-cookie";

const localStorageIsAvailable = () => {
  if (localStorage) {
    try {
      localStorage.setItem("_localstoragetest", "localstoragetestdata");
    } catch (err) {
      return false;
    }
    localStorage.removeItem("_localstoragetest");
    return true;
  }
  return false;
};

export const cacheItem = (name, data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  if (localStorageIsAvailable()) {
    localStorage.setItem(name, data);
  } else {
    Cookies.set(name, data);
  }
};

export const checkForCached = name => {
  let item = null;
  if (localStorageIsAvailable()) {
    item = localStorage.getItem(name);
  } else {
    item = Cookies.get(name);
  }

  try {
    return JSON.parse(item);
  } catch (err) {
    return item;
  }
};
