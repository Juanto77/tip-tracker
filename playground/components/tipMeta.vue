<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

async function getTipMeta() {
  //1 Get Data
  const { data: tipMeta } = await client.from("jobs").select("tip_metab");
  let meta = tipMeta[0]["tip_metab"];

  console.log(Object.keys(meta));
  console.log(meta);

  let metaLength = meta.length; //returns length of array
  let metaString = JSON.stringify(meta, null, 2);
  let parseString = JSON.parse(metaString, (key, value) => {
    // this are is usually used for taking the key, value pairs and doing something with them
  });

  //   console.log(Object.keys(meta));
  //   console.log(tipMeta); // Response from Database
  //   console.log(meta);
  //   console.log(metaLength); //Returns length
  //   console.log(metaString); // Logs deserialize version of database response
  //   console.log(parseString); // Parse to JSON  with intention to create JS objects for reference within code
  //   console.log(parse); // Parse back to JSON for shits & giggles
}

getTipMeta();
</script>
