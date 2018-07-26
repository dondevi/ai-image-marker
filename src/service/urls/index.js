/**
 * =============================================================================
 *  Service URLs
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-06-05
 *
 */

const path = "/sec/samplePhoto/";

export default {
  axios: {
    getPhotoList: path + "getPhotoList",
    getLabelList: path + "getLabelList",
    getShapeList: path + "getShapeList",
    addShape: path + "addShape",
    setShape: path + "setShape",
    getRefine: path + "getRefine",
    setRefine: path + "setRefine",
  },
  socket: {
  },
};
