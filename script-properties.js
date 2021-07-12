function logScriptProperties() {
  let properties = PropertiesService
    .getScriptProperties()
    .getProperties();

  console.log(JSON.stringify(properties, undefined, 4));
};