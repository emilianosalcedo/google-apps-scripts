/**
* Return an object describing what was passed
*
* @param {*} ob the thing to analyze
* @return {object} object information
*/
function whatAmI(ob) {

  try {
    // test for an object
    if (ob !== Object(ob)) {
      return {
        type: typeof ob,
        value: ob,
        length: typeof ob === 'string' ? ob.length : null
      };
    }
    else {
      try {
        var stringify = JSON.stringify(ob);
      }
      catch (err) {
        var stringify = '{"result":"unable to stringify"}';
      }
      return {
        type: typeof ob,
        value: stringify,
        name: ob.constructor ? ob.constructor.name : null,
        nargs: ob.constructor ? ob.constructor.arity : null,
        length: Array.isArray(ob) ? ob.length : null
      };
    }
  }
  catch (err) {
    return {
      type: 'unable to figure out what I am'
    };
  }
}

function getObjType(obj) {
  var type = typeof (obj);
  var salida;

  if (type !== "object") {
    salida = type;
  }
  else {
    salida = "Objeto indeterminado"
  }

  return salida;
}