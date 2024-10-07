function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Convierte los datos recibidos en JSON
  const data = JSON.parse(e.postData.contents);

  // Desestructurar los campos del objeto recibido
  const {
    first_name,
    last_name,
    email,
    country,
    social,
    research_fields,
    university_affiliation,
    fields_of_study,
    problem_solved,
    technology_stack_experience,
    industries,
    studies,
    desired_fields_of_work,
    desired_equipment,
    desired_technology_stack,
    desired_industry,
    desired_problem_to_solve,
  } = data;

  const researchFields = JSON.stringify(research_fields);
  const universityAffiliation = JSON.stringify(university_affiliation);
  const fieldsOfStudy = JSON.stringify(fields_of_study);
  const problemSolved = JSON.stringify(problem_solved);
  const technologyStackExperience = JSON.stringify(technology_stack_experience);
  const industriesText = JSON.stringify(industries);
  const socialText = JSON.stringify(social);
  const studiesText = JSON.stringify(studies);

  sheet.appendRow([
    first_name,
    last_name,
    email,
    country,
    socialText,
    studiesText,
    researchFields,
    universityAffiliation,
    fieldsOfStudy,
    problemSolved,
    industriesText,
    technologyStackExperience,
    desired_fields_of_work,
    desired_equipment,
    desired_technology_stack,
    desired_industry,
    desired_problem_to_solve,
  ]);

  const result = JSON.stringify({
    result: "Insert successful",
  });

  return ContentService.createTextOutput(result);
}

function createTableHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Cabeceras principales
  var headers = [
    "first_name",
    "last_name",
    "email",
    "country",
    "socialText",
    "studiesText",
    "researchFields",
    "universityAffiliation",
    "fieldsOfStudy",
    "problemSolved",
    "industriesText",
    "technologyStackExperience",
    "desiredFieldsOfWork",
    "desiredEquipment",
    "desiredTechnology_stack",
    "desiredIndustry",
    "desiredProblemToSolve",
  ];

  // Colocar las cabeceras en la primera fila
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

function sanitizeDynamoDBData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("D1:I1000");
  var values = range.getValues();

  var sanitizedData = values.map(function (row) {
    return row.map(function (cell) {
      if (typeof cell === "string") {
        return cell.replace(/[{}[\]"SM]/g, " ");
      }
      return cell;
    });
  });

  range.setValues(sanitizedData);
}

function cleanSpecialCharacters() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("D1:I1000");
  var values = range.getValues();

  var cleanedData = values.map(function (row) {
    return row.map(function (cell) {
      if (typeof cell === "string") {
        return cell
          .replace(/::/g, " :")
          .replace(/:/g, "")
          .replace(/,/g, ", \n");
      }
      return cell;
    });
  });

  range.setValues(cleanedData);
}
