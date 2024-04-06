<script setup lang="ts">
import { ErrorMessage, Field, FieldArray, Form } from 'vee-validate'
// import * as yup from 'yup';

const initialData = {
  users: [
    {
      name: '',
      email: '',
    },
  ],
}

// const schema = yup.object().shape({
//   users: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().required().label('Name'),
//         email: yup.string().email().required().label('Email'),
//       })
//     )
//     .strict(),
// });

function onSubmit(values) {
  console.log(JSON.stringify(values, null, 2))
}
</script>

<template>
  <div>
    <h1>vee-validate array fields</h1>

    <Form :initial-values="initialData" :validation-schema="schema" @submit="onSubmit">
      <p />

      <FieldArray v-slot="{ fields, push, remove }" name="users">
        <fieldset v-for="(field, idx) in fields" :key="field.key" class="InputGroup">
          <legend>User #{{ idx }}</legend>
          <label :for="`name_${idx}`">Name</label>
          <input :id="`name_${idx}`" type="text" :name="`users[${idx}].name`">
          <!-- <Field :id="`name_${idx}`" :name="`users[${idx}].name`" /> -->
          <ErrorMessage :name="`users[${idx}].name`" />

          <label :for="`email_${idx}`">Email</label>
          <Field :id="`email_${idx}`" :name="`users[${idx}].email`" type="email" />
          <ErrorMessage :name="`users[${idx}].email`" />
          <button type="button" @click="remove(idx)">
            X
          </button>
        </fieldset>

        <button type="button" @click="push({ email: '', name: '' })">
          Add User +
        </button>
      </FieldArray>

      <button type="submit">
        Submit
      </button>
    </Form>
  </div>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 500px;
}

input {
  display: block;
}

span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
}

button[type='submit'] {
  margin-top: 10px;
}

form {
  padding: 20px;
  border: 1px solid black;
}

form + form {
  margin-top: 20px;
}

.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}

.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
