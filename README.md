# Lean Validation

## Installation

### Using NPM
```bash
npm install lean-validation
```

### Using Yarn
```bash
yarn add lean-validation
```

## Documentation
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
  - [How to Import](#how-to-import)
  - [Form Validator Syntax](#form-validator-syntax)
  - [State Integration](#state-integration)
  - [Add a Form Submission Check](#add-a-form-submission-check)
  - [Check for Validations](#check-for-validations)
  - [Show Error Messages](#show-error-messages)
  - [Handle Form Submission](#handle-form-submission)

## Getting Started

## Usage Guide

### How to Import

```js
import { LeanValidation } from 'lean-validation'
```

### Form Validator Syntax

The Validator can have multiple validation tests per a single form fields and can be adjusted to when the message trigger by manipulating the validWhen parameter in the Validation JSON.

The package uses the [Validator.JS](https://www.npmjs.com/package/validator) package for validation rules. Visit the [Validator.JS Repo](https://www.npmjs.com/package/validator) to see all the rules

General Syntax of the object creation of the validator 

```js
constructor(props) {
  super(props);

  this.validator = new LeanValidation([
    {
      field: 'firstName',
      method: 'isEmpty',
      validWhen: false,
      message: 'First Name is required.'
    },
    {
      field: 'firstName',
      method: 'isLength',
      validWhen: true,
      args: [{ min: "2", max: "24" }],
      message: "Should have Min: 2  and Max: 24 characters."
    },
    {
      field: 'firstName',
      method: 'isAlphanumeric',
      validWhen: true,
      args: ['en-US'],
      message: 'Should contain only Alphanumeric Characters.'
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Password is required.'
    },
    {
      field: 'password',
      method: 'isLength',
      validWhen: true,
      args: [{ min: "6", max: "24" }],
      message: "Should have Min: 6  and Max: 24 characters."
    },
  ])
}
```

### State Integration

Now add the the object of the Validator to the current state

```js
constructor(props) {
  super (props);

  this.validator = new LeanValidation([
    {
      field: 'firstName',
      method: 'isEmpty',
      validWhen: false,
      message: 'First Name is required.'
    },
    {
      ....
    }
  ])

  this.state = {
    validation: this.validator.valid()
  }
}
```

### Add a Form Submission Check

Now add a new submitted variable to track the submission of the form. 

If submitted is made true it will perform realtime validations but show the messages beforehand and remove them when the validation become truthy.

```js
constructor(props) {
  super (props);

  this.validator = new LeanValidation([
    {
      field: 'firstName',
      method: 'isEmpty',
      validWhen: false,
      message: 'First Name is required.'
    },
    {
      ....
    }
  ])

  this.state = {
    validation: this.validator.valid()
  }

  this.submitted = false;
}
```

## Check for Validations

The code will check the form for validations when the render occurs based on the value of the submitted variable that we defined just now.

If true the state will be validated each time the page is rendered otherwise will show the current value of the validation object i.e if its valid or not.

Add this code just after starting the render method of the component.

```js
render() {
  let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
}
```

## Show Error Messages

As soon as the validation starts, if any validation error occurs the validation object will populate the error that we described in the Validator JSON.

The syntax of the error message will be : **validation-object-name.fieldname.message**

```html
<p className="text-danger">{validation.firstName.message}</p>
```

## Handle Form Submission

On form submission we validate the current state, but the validator will only check for the variables in the state that are present in the Validator JSON. We update the validation object in the current state and change the submitted variable to true to start showing the messages if anything is not valid otherwise complete the form submission and use the validated data as we want.

```js
formCapture = () => {
  const validation = this.validator.validate(this.state);
  this.setState({ validation });
  this.submitted = true;

  if (validation.isValid) {
    // Validation Successful   
  } 
}
```

## Author

Anurag Makol | Programmer in day, Gamer by Night  
