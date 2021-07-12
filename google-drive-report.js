/**
 * 
 */
function scanGoogleDrive() {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let files = DriveApp.getFiles();
  let timezone = Session.getScriptTimeZone();
  let acceso = acceso;
  let permisos = permisos;
  let email = Session.getActiveUser().getEmail();

  let file, created, access, url, permission, owner, size, users;
  let privacy, view, viewers, edit, editors, name, modified;
  /** @type {string[]} */
  let rows = [
    [
      "Propietario",
      "URL",
      "Archivo",
      "Acceso",
      "Permisos Globales",
      "Usuarios",
      "Creado",
      "Modificado",
      "Tamaño"
    ]
  ];

  while (files.hasNext()) {
    file = files.next();

    try {
      access = file.getSharingAccess();
      permission = file.getSharingPermission();
      size = file.getSize() / (1024 * 1024);
      viewers = file.getViewers();
      editors = file.getEditors();
      owner = file.getOwner().getName();

      view = [];
      edit = [];

      created = Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd")
      modified = Utilities.formatDate(file.getLastUpdated(), timezone, "yyyy-MM-dd")
      url = file.getUrl();
      name = file.getName();

      for (v = 0; v < viewers.length; v++) {
        view.push(viewers[v].getName());
      }

      for (ed = 0; ed < editors.length; ed++) {
        edit.push(editors[ed].getName());
      }

      switch (access) {
        case acceso.PRIVATE:
          privacy = "PRIVADO";
          break;
        case acceso.ANYONE:
          privacy = "CUALQUIERA";
          break;
        case acceso.ANYONE_WITH_LINK:
          privacy = "CUALQUIERA CON EL ENLACE";
          break;
        case acceso.DOMAIN:
          privacy = "CUALQUIERA DENTRO DEL DOMINIO";
          break;
        case acceso.DOMAIN_WITH_LINK:
          privacy = "CUALQUIERA DENTRO DEL DOMINIO CON EL ENLACE";
          break;
        default:
          privacy = "DESCONOCIDO";
      }

      switch (permission) {
        case permisos.COMMENT:
          permission = "COMENTADOR";
          break;
        case permisos.VIEW:
          permission = "LECTOR";
          break;
        case permisos.EDIT:
          permission = "EDITOR";
          break;
        default:
          permission = "";
      }

      view = view.join(", ");
      edit = edit.join(", ");

      permission = (permission == "" ? "" : permission);
      users = (edit == "" ? "" : edit + " EDITOR") + (view == "" ? "" : ", " + view + " LECTOR");

      rows.push([owner, url, name, privacy, permission, users, created, modified, size]);
    }
    catch (error) {
      Logger.log(error.toString());
      Logger.log(file.getName());
    };
  }

  ss.getRange(1, 1, rows.length, rows[0].length).setValues(rows)
}