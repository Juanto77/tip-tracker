<!-- To Do 
- Create page Layout
    - Link with ref. fields
- Write Logic for if job = true, then create new job
-->

<script setup>
const client = useSupabaseClient();
const loading = ref(true);
const name = ref("");
// const food_tip = ref("");
// const bus_tip = ref("");
// const bar_tip = ref("");

// loading.value = true;

// const { data } = await supabase
//   .from("jobs")
//   .select("user_id", "name", "foodtip", "bustip", "bartip");

// console.log(data);

loading.value = false;

async function addJob() {
  try {
    loading.value = true;
    const user = useSupabaseUser();
    const updates = {
      user_id: user.value.id,
      name: "Q39",
      food_tip: "2",
      bus_tip: "1",
      bar_tip: "5",
    };
    const { error } = await client.from("jobs").insert(updates, {
      return: "minimal",
    });
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
