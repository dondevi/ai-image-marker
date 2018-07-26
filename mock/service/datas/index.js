/**
 * =============================================================================
 *  Mock Datas
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 */

import * as DATA_photo from "./photo.js";
import * as DATA_label from "./label.js";
import * as DATA_shape from "./shape.js";

export default {
  axios: {
    ...DATA_photo,
    ...DATA_label,
    ...DATA_shape,
  },
  socket: {
  },
};
