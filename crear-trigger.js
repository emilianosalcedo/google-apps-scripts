/**
 * Crea un trigger de tiempo.
 */
function crearTrigger(metodo) {
  // CADA MINUTO
  ScriptApp.newTrigger(metodo)
      .timeBased()
      .everyMinutes(1)
      .create();
}

/**
 * Crea dos triggers de tiempo.
 */
function crearDosTriggers() {
  // CADA 6 HORAS
  ScriptApp.newTrigger('myFunction')
      .timeBased()
      .everyHours(6)
      .create();

  // TODOS LOS LUNES A LAS 9
  ScriptApp.newTrigger('myFunction')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .atHour(9)
      .create();
}

/**
 * Crea un trigger cuando se abre una planilla.
 */
function crearTriggerAlAbrir(funcion) {
  var planilla = SpreadsheetApp.getActive();
  
  ScriptApp.newTrigger(funcion)
      .forSpreadsheet(planilla)
      .onOpen()
      .create();
}

/**
 * Crea un trigger cuando se edita una solapa.
 */
function crearTriggerAlEditar(hoja, funcion) {
  var solapa = SpreadsheetApp.getActive().getSheetByName(hoja);
  
  ScriptApp.newTrigger(funcion)
      .forSpreadsheet(solapa)
      .onOpen()
      .create();
}

/**
 * Elimina un trigger.
 * @param {string} triggerId El ID del Trigger.
 */
function borrarTriggerPorId(triggerId) {
  // RECORRE TODOS LOS TRIGGERS
  var allTriggers = ScriptApp.getProjectTriggers();

  for (var i = 0; i < allTriggers.length; i++) {
    // SI EL TRIGGER ACTUAL ES EL CORRECTO BORRARLO
    if (allTriggers[i].getUniqueId() === triggerId) {
      ScriptApp.deleteTrigger(allTriggers[i]);
      break;
    }
  }
}

/**
 * Elimina todos los triggers de un proyecto.
 */
function borrarTriggers() {
  var allTriggers = ScriptApp.getProjectTriggers();

  for (var i = 0; i < allTriggers.length; i++) {
      ScriptApp.deleteTrigger(allTriggers[i]);
  }
}