// безопасно переводит ошибку в строку
export function stringifyError(error: any): string {
  let str;
  try {
    str = JSON.stringify(error);
    if (str === '{}') {
      str = error + '';
    }
  } catch (e) {
    str = (error + '');
  }
  return str;
}
