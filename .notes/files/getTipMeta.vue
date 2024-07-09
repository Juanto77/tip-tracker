<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
//
/* Get Tip Meta jsonb */
//#region
async function getTipMeta() {
  //1 Get Data
  const { data: tipMeta } = await client.from('jobs').select('tip_meta');

  //2 Declare variables
  let meta = tipMeta[0];
  console.log(meta);
  //3 Return Length
  //   let metaLength = tipMeta?.length; // Returns 1

  // Logs deserialize version of database response
  let metaString = JSON.stringify(tipMeta, null, 2);

  //5 Parse to JSON  with intention to create JS objects for reference within code
  let parseString = JSON.parse(metaString, (key, value) => {
    // console.log(key, value);
    for (let key in value) {
      //   console.log(key, value);
    }
    // console.log(typeof value); // Returns type of object being passed over
  });

  //6 Parse back to JSON for shits & giggles
  let parse = JSON.parse(metaString); // Returns a re-structured array

  ///////////////////////////////////////////////////////////////////////////////////////////

  // Console Log

  console.log(tipMeta); // Response from Database
  //console.log(metaLength);    //Returns length
  //console.log(metaString);    // Logs deserialize version of database response
  //console.log(parseString); // Parse to JSON  with intention to create JS objects for reference within code
  console.log(parse); // Parse back to JSON for shits & giggles
  //
}
//#endregion
///////////////////////////////////////////////////////////////////////////////////////////

/* Get Tip Meta jsonb[] */
//#region
async function getTipMetaB() {
  //1 Get Data
  const { data: tipMetaB } = await client.from('jobs').select(`tip_metab`);

  //2 Declare variables
  let metaB = tipMetaB[0];

  //3 Return Length
  //   let metaLengthB = tipMetaB?.length; // Returns 1

  //4 Returns deserialize version of database response
  let metaStringB = JSON.stringify(tipMetaB, null, 1); // Returns destructured array (See Reference)

  /*
  //5 Parse to JSON  with intention to create JS objects for reference within code
  let parseStringB = JSON.parse(metaStringB, (key, value) => {
    // console.log(key, value);

    // for (let key in value) {
    //   console.log(key, value);
    // }
    // console.log(typeof value); // Returns type of object being passed over
  }); */

  //6 Parse back to JSON for shits & giggles
  let parseB = JSON.parse(JSON.stringify(tipMetaB)); // Returns a re-structured array

  ///////////////////////////////////////////////////////////////////////////////////////////

  // Console Log
  console.log(tipMetaB); // Response from Database
  console.log(metaB);
  //   console.log(metaLengthB);    //Returns length
  //   console.log(metaStringB); // Logs deserialize version of database response
  //   console.log(parseStringB); // Parse to JSON  with intention to create JS objects for reference
  console.log(parseB); // Parse back to JSON for shits & giggles
}
//#endregion
///////////////////////////////////////////////////////////////////////////////////////////

/* Tip Meta C json[b] */
//#region
async function getTipMetaC() {
  const { data: tipMeta } = await client.from('jobs').select('tip_metab'); //Gets data from database

  let meta = tipMeta[0]['tip_metab']; //2 Traverse through json data received from database

  console.log(Object.keys(meta)); //Returns keys of objects

  let metaLengthC = meta.length; // Returns length of array

  let metaStringC = JSON.stringify(meta, null, 2); // Turns json data into a string, not usually used for this case but good to know.

  let parseStringC = JSON.parse(metaStringC, (key, value) => {
    //parse a dataset into a JSON structure
    //used for interpreting key, value pairs to integrate into the code.
    //(For loops), (typeof checking), create new Objects, etc...
  });

  let parse = JSON.parse(metaStringC); // Returns a re-structured array, essentially back to square one.
}
//#endregion
</script>
<template />
