function validate(inputText) {
    if (inputText == "") {
      return "Name must be filled out";
    }
    return null;
}

export { validate }
