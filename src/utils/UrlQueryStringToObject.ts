/**
 * @description 주소에서 parameter 부분을 빼서 객체로
 */

interface IObjectKeys {
  [key: string]: string | number | undefined;
}

const UrlQueryStringToObject = <T extends IObjectKeys>(
  url?: string,
): T | undefined => {
  const obj: IObjectKeys = {};
  const _url = url || window.document.location.href;
  const queryString = _url.substring(_url.indexOf("?") + 1, _url.length);
  queryString.split("&").map((i) => {
    const [key, value] = i.split("=");
    obj[key] = decodeURIComponent(value);
  });
  if (_url.indexOf("?") === -1) {
    return undefined;
  }
  return obj as T;
};

export default UrlQueryStringToObject;
