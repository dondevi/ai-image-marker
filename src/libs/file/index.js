/**
 * @author dondevi
 * @create 2018-06-04
 */

export function fileToObjectURL (file) {
  return window.URL.createObjectURL(file);
}

export function fileToDataURL (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = event => {
      resolve(event.target.result);
    }
    fileReader.readAsDataURL(file);
  });
}

export function fileToImage (file) {
  return new Promise((resolve, reject) => {
    const url = fileToObjectURL(file);
    urlToImage(url).then(resolve);
  });
}

export function urlToImage (url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = event => resolve(image);
    image.src = url;
  });
}
