// function upper_case(str) {
//   regexp = /^[A-Z]/;
//   if (regexp.test(str)) {
//     console.log("String's first character is uppercase");
//   } else {
//     console.log("String's first character is not uppercase");
//   }
// }
// upper_case("Abcd");
// upper_case("abcd");

// function is_creditCard(str) {
//   regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

//   if (regexp.test(str)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// console.log(is_creditCard("378282246310006"));

// console.log(is_creditCard("37828224630006"));

// function valid_email(str) {
//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (mailformat.test(str)) {
//     console.log("Valid email address!");
//   } else {
//     console.log("You have entered an invalid email address!");
//   }
// }

// valid_email("me-info@example.com");
