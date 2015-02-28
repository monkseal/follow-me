// A test class to make sure es6 is working

class Greeter {
  sayHi(name = 'World') {
    console.log(this.text());
  }

  text(name = 'World') {
     return `Hello ${name}!`;
  }

}

export default Greeter ; 
