<template>
  <ClientOnly>
    <FormKit
      type="form"
      id="contactForm"
      name="contactForm"
      submit-label="Send"
      class="form"
      :classes="{
        actions: 'px-5',
      }"
    >
      <div class="" id="Name">
        <div class="px-2" id="formFirstName">
          <FormKit
            type="text"
            name="firstName"
            id="firstName"
            label="First Name"
            help="Your First Name"
          />
        </div>
        <div class="px-2" id="formLastName">
          <FormKit
            type="text"
            name="lastName"
            id="lastName"
            label="Last Name"
            help="Your Last Name"
          />
        </div>
      </div>
      <div class="flex" id="formContact">
        <div class="px-2" id="formEmail">
          <FormKit
            type="email"
            label="Email Address"
            help="Please enter your email
    address"
            validation="required|email"
            validation-visibility="submit"
            placeholder="Email Address"
          />
        </div>
        <div class="px-2" id="formTel">
          <FormKit
            type="tel"
            label="Phone Number"
            aria-placeholder="xxx-xxx-xxxx"
            validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{
              matches: 'Phone number must be in the format xxx-xxx-xxxx',
            }"
            validation-visibility="submit"
          />
        </div>
      </div>
      <div class="px-2" id="formMessage">
        <FormKit
          type="textarea"
          name="message"
          label="Your Message"
          validation="required"
          validation-visibility="submit"
        />
      </div>
    </FormKit>
  </ClientOnly>
</template>
