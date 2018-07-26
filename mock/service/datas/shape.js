/**
 * @author dondevi
 * @create 2018-06-07
 */

const shapeList = {
  "0c1ed22a36b3bf4688da64aeb5ea5e65": {
    "0": [
      { id: "f5nqa8ihbck", form: "rect", shapePoints: [{"x":310,"y":440},{"x":400,"y":440 },{"x":400,"y":530},{"x":310, "y":530}] },
    ],
  },
  "0f4e48bcbd2439345d66ff2f099281db": {
    "3": [
      { id: "rx4kgu1sbj", form: "circle", shapePoints: [{"x":390,"y":389},{"x":458,"y":389},{"x":458,"y":457},{"x":390,"y":457}] },
      { id: "c758e137e3", form: "circle", shapePoints: [{"x":526,"y":390},{"x":592,"y":390},{"x":592,"y":456},{"x":526,"y":456}] },
    ],
  },
};

export const getShapeList = ({ param }) => {
  return shapeList[param] && JSON.parse(JSON.stringify(shapeList[param]));
};

export const addShape = ({ param: { photoId, shapeData } }) => {
  try {
    if (!photoId || !shapeData) { throw "Request photoId"; }
    let shape = shapeList[photoId] = shapeList[photoId] || {};
    let { label } = shapeData;
    shape[label] = shape[label] || [];
    shape[label].push(shapeData);
    delete shapeData.label;
  } catch (message) {
    throw { status: 200, exception: { message } };
  }
};

export const setShape = ({ param: { photoId, shapeData } }) => {
  try {
    if (!photoId || !shapeData) { throw "Request photoId"; }
    let shape = shapeList[photoId];
    if (!shape) { throw "Not exsits shape"; }
    let { id, label } = shapeData;
    let index = shape[label].findIndex(shapeData => shapeData.id === id);
    shape[label][index] = shapeData;
    delete shapeData.label;
  } catch (message) {
    throw { status: 200, exception: { message } };
  }
};

export const delShape = (request) => {
};
