const setItem = (name: string, data: any): void => localStorage.setItem(name, JSON.stringify(data));
const getItem = (name: string): any => localStorage.getItem(name);

export { setItem, getItem };
