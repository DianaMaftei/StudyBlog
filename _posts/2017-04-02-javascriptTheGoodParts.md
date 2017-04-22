---
layout: post
title: "Javascript: The Good Parts"
category: book
date: '2017-04-02'
sources:
  - name: "JavaScript: The Good Parts by Douglas Crockford"
    url: "https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742"
tags:
  - Javascript
---
{::options parse_block_html="true" /}
<div class="postBody">
{::options parse_block_html="true" /}
<div class="tocContainer">
<h2 class="contents">Contents</h2>
1. TOC
{:toc}
</div>

## CHAPTER 1: The good parts
### Analyzing JavaScript (the good and the bad)
- JavaScript’s functions are first class objects with (mostly) lexical scoping
- Javascript is the first lambda language to go mainstream
- it is a loosely typed language, so JavaScript compilers are unable to detect type errors
- JavaScript has a very powerful object literal notation; objects can be created simply by listing their components.
- it has a class-free object system in which objects inherit properties directly from other objects
- it depends on global variables for linkage
- JSLint is a static code analysis tool used in software development for checking if JavaScript source code complies with coding rules

## CHAPTER 2: Grammar

### Comments
- the /* \*/ form of block comments came from a language called PL/I
- in JavaScript, those pairs can also occur in regular expression literals, so block comments are not safe for commenting out blocks of code

<span class="alert-box warning">
    <span class="alert-icon" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
    <span class="alert-message">It is recommended that /* */ comments be avoided and // comments be used instead.</span>
</span>

### Reserved words
`abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var volatile void while with`

- most of the reserved words in this list are not used in the language
- the list does not include some words that should have been reserved but were not, such as `undefined`, `NaN`, and `infinity`.

### Numbers
- JavaScript has a single number type
- internally, it is represented as 64-bit floating point, the same as Java’s double
- there is no separate integer type, so 1 and 1.0 are the same value
- the value `NaN` is a number value that is the result of an operation that cannot produce a normal result; `NaN` is not equal to any value, including itself
- you can detect `NaN` with the `Number.isNaN(value)` function
- numbers have methods
- JavaScript has a `Math` object that contains a set of methods that act on numbers. For example, the `Math.floor(number)` method can be used to convert a number into an integer

### Strings
- a string literal can be wrapped in single quotes ‘ ’ or double quotes “ “
- the \ (backslash) is the escape character
- all characters in JavaScript are 16 bits wide
- JavaScript does not have a character type; to represent a character, make a string with just one character in it
- two strings containing exactly the same characters in the same order are considered to be the same string. So: 'c' + 'a' + 't' === 'cat' is true

### Statements
- the `switch`, `while`, `for`, and `do while` statements are allowed to have an optional label prefix that interacts with the `break` statement
- unlike many other languages, blocks in JavaScript do not create a new scope, so variables should be defined at the top of the function, not in blocks
- the falsy values are: `false`, `null`, `undefined`, the empty string '', the number 0, the number `NaN`
- all other values are truthy, including `true`, the string 'false', and all objects
- `for in` loop  enumerates the property names (or keys) of an object
- it is usually necessary to test `object.hasOwnProperty(variable`) to determine whether the property name is truly a member of the object or was found instead on the prototype chain

```
for (myvar in obj) {
    if (obj.hasOwnProperty(myvar)) {...}
}
```
- the throw statement raises an exception; the expression is usually an object literal containing a name property and a message property; it can have only one catch, and one finally

```
function myMethod() {
    throw "This is an error.";
}

try {
    myMethod();
}
catch(e) {
    console.log(e);   //This is an error.
}
```

### Expressions

**Table: Operator precedence**

| Symbol | Operator name |
|:--------:|:-------:|
| . [] ( )   | Refinement and invocation   |
| delete new typeof + - !   | Unary operators   |
| * / %   | Multiplication, division, modulo   |
| + -   | Addition/concatenation, subtraction   |
| >= <= > <   | Inequality   |
| === !==   | Equality|
| &&   | Logical and   |
| \|\|   | Logical or    |
| ? :   | Ternary   |
{: rules="all"}

- the values produced by `typeof` are `number` , `string`, `boolean`, `undefined`, `function`, and `object`
- the / operator can produce a non integer result, even if both operands are integers

## CHAPTER 3: Objects

- the simple types (primitives) of JavaScript are `number`, `string`, `boolean` (true and false), `null`, and `undefined`; all other values are objects
- numbers, strings, and booleans are object-like in that they have methods, but they are immutable
- objects in JavaScript are mutable keyed collections
- in JavaScript, arrays are objects, functions are objects, regular expressions are objects, and, of course, objects are objects
- objects in JavaScript are class-free
- JavaScript includes a prototype linkage feature that allows one object to inherit the properties of another

### Object Literals
- an object literal is a pair of curly braces surrounding zero or more name/value pairs

```
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};
```

- objects can nest:

```
var user = {
    name: {
        firstName: 'John',
        lastName: 'Doe'
    },
    age: 20,
    address: {
        street: 'Belleview',
        number: 9
    }
}
```

### Retrieval
- values can be retrieved from an object by wrapping a string expression in a [] suffix
- if the string expression is a constant, and if it is a legal JavaScript name and not a reserved word, then the . (dot) notation can be used instead.

```
var foo = {'bar': 'baz'};

// bracket notation
var x = foo['bar'];     // x is equal to 'baz'

// dot notation
var x = foo.bar;     // x is equal to 'baz'
```

- the \|\| operator can be used to fill in default values:

```
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";
```

- attempting to retrieve values from `undefined` will throw a `TypeError exception`; this can be guarded against with the && operator:

 ```
 flight.equipment               // undefined
 flight.equipment.model          // throw "TypeError"
 flight.equipment && flight.equipment.model    // undefined
```

### Update
- a value in an object can be updated by assignment
- if the property name already exists in the object, the property value is replaced:

```
stooge['first-name'] = 'Jerome';
```
- if the object does not already have that property name, the object is augmented

### Reference
- objects are passed around by reference; they are never copied

### Prototype
- every object is linked to a prototype object from which it can inherit properties
- all objects created from object literals are linked to `Object.prototype`, an object that comes standard with JavaScript.
- the prototype link has no effect on updating; when we make changes to an object, the object’s prototype is not touched
- if we try to retrieve a property value from an object, and if the object lacks the property name, then JavaScript attempts to retrieve the property value from the prototype object
- if that object is lacking the property, then it goes to its prototype, and so on until the process finally bottoms out with `Object.prototype`
- if the desired property exists nowhere in the prototype chain, then the result is the `undefined` value (this is called delegation)
- if we add a new property to a prototype, that property will immediately be visible in all of the objects that are based on that prototype

### Reflection
- it is easy to inspect an object to determine what properties it has by attempting to retrieve the properties and examining the values obtained
- the `typeof` operator can be very helpful in determining the type of a property
- the other approach is to use the `hasOwnProperty` method, which returns `true` if the object has a particular property (this method does not look at the prototype chain)

### Enumeration
- the `for in` statement can loop over all of the property names in an object
- the enumeration will include all of the properties (including functions and prototype properties that you might not be interested in)
- here is no guarantee on the order of the names

### Delete
- the `delete` operator can be used to remove a property from an object
- it will remove a property from the object if it has one but it will not touch any of the objects in the prototype linkage

## CHAPTER 4: Functions
- functions are the fundamental modular unit of JavaScript
 - they are used for code reuse, information hiding, and composition

### Function Objects
- functions in JavaScript are objects
- function objects are linked to `Function.prototype` (which is itself linked to `Object.prototype`)
- the function can use its name to call itself recursively
- the name can also be used by debuggers and development tools to identify the function
- if a function is not given a name, it is said to be anonymous
- within the parentheses is a set of zero or more parameter names, separated by commas
- these names will be defined as variables in the function
- unlike ordinary variables, instead of being initialized to `undefined`, they will be initialized to the arguments supplied when the function is invoked
- functions can be defined inside of other functions
 - the function object created by a function literal contains a link to that outer context (this is called closure)
- in addition to the declared parameters, every function receives two additional parameters: `this` and `arguments`
- there is no run-time error when the number of arguments and the number of parameters do not match
- if there are too many argument values, the extra argument values will be ignored; if there are too few argument values, the `undefined` value will be substituted for the missing values
- there is no type checking on the argument values: any type of value can be passed to any parameter

### The Method Invocation Pattern
- when a function is stored as a property of an object, we call it a **method**

```
var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment(); //Method invocation
```
- the binding of `this` to the object happens at invocation time
 - methods that get their object context from `this` are called **public methods**

### The Function Invocation Pattern
- when a function is not the property of an object, then it is invoked as a function:

```
var sum = add(3, 4);    // sum is 7
```
- when a function is invoked with this pattern, `this` is bound to the global object (this was a mistake in the design of the language)
- a consequence of this error is that a method cannot employ an inner function to help it do its work because the inner function does not share the method’s access to the object as its this is bound to the wrong value
- fortunately, there is an easy workaround: if the method defines a variable (a convention is to use `var that`) and assigns it the value of `this`, the inner function will have access to this through the new variable

```
myObject.double = function () {
    var that = this;      // workaround
    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();    // invoke helper as a function
};

myObject.double();       // invoke double as a method
document.writeln(myObject.getValue());    // 6
```
### The Constructor Invocation Pattern (not recommended)

- JavaScript is a prototypal inheritance language => objects can inherit properties directly from other objects
- JavaScript itself is not confident in its prototypal nature, so it offers an object-making syntax that is reminiscent of the classical languages
- if a function is invoked with the `new` prefix, then a new object will be created with a hidden link to the value of the function’s prototype member, and this will be bound to that new object.
- functions that are intended to be used with the `new` prefix are called constructors => they are kept in variables with a capitalized name

<span class="alert-box warning">
    <span class="alert-icon" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
    <span class="alert-message">
        If a constructor is called without the new prefix, very bad things can happen without a compiletime or runtime warning, so the capitalization convention is really important.
    </span>
</span>

### The Apply Invocation Pattern

- the `apply` method lets us construct an array of arguments to use to invoke a function
- it also lets us choose the value of `this`
- it takes two parameters: the first is the value that should be bound to `this`,  the second is an array of parameters

```
function myFunction(a, b) {
    return a * b;
}
myArray = [10, 2];
myObject = myFunction.apply(myObject, myArray);  // Will return 20
```

### Arguments
- the `arguments` array gives the function access to all of the arguments that were supplied with the invocation, including excess arguments that were not assigned to parameters
- this makes it possible to write functions that take an unspecified number of parameters:

```
var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};
document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108
```
- because of a design error, `arguments` is not really an array, it is an array-like object
- `arguments` has a `length` property, but it lacks all of the array methods

### Return
- a function always returns a value
- if the return value is not specified, then `undefined` is returned
- if the function was invoked with the `new` prefix and the return value is not an object, then `this` (the new object) is returned instead

### Exceptions
- the `throw` statement should be given an exception object containing a name property that identifies the type of the exception, and a descriptive message property
- you can also add other properties
- the exception object will be delivered to the catch clause of a try statement:

```
var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        }
    }
    return a + b;
}

var try_it = function () {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ': ' + e.message);
    }
}

try_it();
```
- a `try` statement has a single `catch` block that will catch all exceptions
- if your handling depends on the type of the exception, then the exception handler will have to inspect the name to determine the type of the exception

### Augmenting Types
- because of the dynamic nature of JavaScript’s prototypal inheritance, all values are immediately endowed with the new methods, even values that were created before the methods were created
 -the prototypes of the basic types are public structures, so care must be taken when mixing libraries
- one defensive technique is to add a method only if the method is known to be missing:

```
// Add a method conditionally.
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
};
```
### Recursion
- recursive functions can be very effective in manipulating tree structures such as the browser’s Document Object Model (DOM)
- each recursive call is given a smaller piece of the tree to work on
- JavaScript does not currently provide tail recursion optimization
 - functions that recurse very deeply can fail by exhausting the return stack

### Scope
- most languages with C syntax have block scope
- qll variables defined in a block (a list of statements wrapped with curly braces) are not visible from outside of the block
- the variables defined in a block can be released when execution of the block is finished
- JavaScript does not have block scope, but function scope
- it means that the parameters and variables defined in a function are not visible outside of the function, and that a variable defined anywhere within a function is visible everywhere within the function
- in many modern languages, it is recommended that variables be declared as late as possible, at the first point of use
- that turns out to be bad advice for JavaScript because it lacks block scope

<span class="alert-box success">
    <span class="alert-icon" ><i class="fa fa-check-circle" aria-hidden="true"></i></span>
    <span class="alert-message">It is best to declare all of the variables used in a function at the top of the function body.</span>
</span>

### Closure
- closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope)
- these functions 'remember' the environment in which they were created.
- an interesting case is when the inner function has a longer lifetime than its outer function

```
var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    };
};
// Make an instance of quo.
var myQuo = quo("amazed");
console.log(myQuo.get_status()); // amazed
```
- this **quo** function is designed to be used without the `new` prefix, so the name is not capitalized
- when we call **quo**, it returns a new object containing a **get_status** method
- a reference to that object is stored in **myQuo**
- the **get_status** method still has privileged access to **quo**’s status property even though **quo** has already returned
- **get_status** does not have access to a copy of the parameter => it has access to the parameter itself; this is possible because the function has access to the context in which it was created (this is called **closure**)

### Callbacks
- functions can make it easier to deal with discontinuous events
- a synchronous request over the network will leave the client in a frozen state
- the solution is to make an asynchronous request, providing a callback function that will be invoked when the server’s response is received.
```
request = prepare_the_request( );
send_request_asynchronously(request, function (response) {
    display(response);
});
```
- we pass a function parameter to the **send_request_asynchronously** function that will be called when the response is available

[More info about callbacks](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)

### Module
- we can use functions and closures to make modules
- a module is a function or object that presents an interface but that hides its state and implementation
- the general pattern of a module is a function that defines private variables and functions, creates privileged functions which, through closure, will have access to the private variables and functions, and that returns the privileged functions or stores them in an accessible place
- it promotes information hiding and other good design practices
- it is very effective in encapsulating applications and other singletons

```
var serial_maker = function ( ) {

    // Produce an object that produces unique strings. A unique string is made up of two parts: a prefix and a sequence number. The object comes with methods for setting the prefix and sequence number, and a gensym method that produces unique strings.

    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
         seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var seqer = serial_maker();
seqer.set_prefix = ('Q';)
seqer.set_seq = (1000);
var unique = seqer.gensym( ); // unique is "Q1000"
```
### Cascade (Chaining)
- it is typical for methods that set or change the state of an object to return nothing
- if we have those methods return `this` instead of `undefined`, we can enable cascades

```
str.replace("k", "R").toUpperCase().substr(0,4);
```
[More info about chaining methods](http://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/)

### Curry
- currying allows us to produce a new function by combining a function and an argument:

```
var greet = function(greeting, name) {
  console.log(greeting + ", " + name);
};
greet("Hello", "Heidi"); //"Hello, Heidi"

// curried function
var greetCurried = function(greeting) {
  return function(name) {
    console.log(greeting + ", " + name);
  };
};

var greetHello = greetCurried("Hello");
greetHello("Heidi"); //"Hello, Heidi"
greetHello("Eddie"); //"Hello, Eddie"

```
[Example above source and extra info](https://www.sitepoint.com/currying-in-functional-javascript/)

### Memoization
- functions can use objects to remember the results of previous operations, making it possible to avoid unnecessary work
- this optimization is called **memoization**

```
var cachedResult;
function doHeavyCalculation() {
    if (typeof(cachedResult) !== 'undefined')
        return cachedResult;

    // no cached result available. calculate it, and store it.
    cachedResult = /* do your computation */;
    return cachedResult;
}
```
- when our function is called, it first looks to see if it already knows the result => if it does, it can immediately return it

## CHAPTER 5: Inheritance

- JavaScript, being a loosely typed language, never casts
- the lineage of an object is irrelevant, what matters about an object is what it can do, not what it is descended from
- JavaScript provides a much richer set of code reuse patterns
- in classical languages, objects are instances of classes, and a class can inherit from another class
- JavaScript is a prototypal language, which means that objects inherit directly from other objects

### Pseudoclassical
- JavaScript is conflicted about its prototypal nature, its prototype mechanism is obscured by some complicated syntactic business that looks vaguely classical
- the prototype object is the place where inherited traits are to be deposited
- every function gets a prototype object because the language does not provide a way of determining which functions are intended to be used as constructors
- the constructor property is not useful => it is the prototype object that is important
- if you forget to include the `new` prefix when calling a constructor function, then this will not be bound to a new object => sadly, this will be bound to the global object, so instead of augmenting your new object, you will be clobbering global variables; there is no compile warning, and there is no runtime warning.
- the pseudoclassical form can provide comfort to programmers who are unfamiliar with JavaScript, but it also hides the true nature of the language
- the classically inspired notation can induce programmers to compose hierarchies that are unnecessarily deep and complicated

```
var Mammal = function (name) {
    this.name = name;
};

Mammal.prototype.get_name = function () {
    return this.name;
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(); // 'Herb the Mammal'
```
### Object Specifiers
- it sometimes happens that a constructor is given a very large number of parameters => this can be troublesome because it can be very difficult to remember the order of the arguments
- it can be much friendlier if we write the constructor to accept a single object specifier instead; that object contains the specification of the object to be constructed

```
// instead of:
var myObject = maker(f, l, m, c, s);

// we can write:
var myObject = maker({
    first: f,
    last: l,
    state: s,
    city: c
});
```
- arguments can now be listed in any order, arguments can be left out if the constructor is smart about defaults, and the code is much easier to read

### Prototypal
- prototypal inheritance is conceptually simpler than classical inheritance: a new object can inherit the properties of an old object

```
var myMammal = {
    name : 'Herb the Mammal',
    get_name : function ( ) {
        return this.name;
    },
    says : function ( ) {
        return this.saying || '';
    }
};
```
- once we have an object that we like, we can make more instances with the `Object.create` method

```
var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function ( ) {
    return this.says( ) + ' ' + this.name + ' ' + this.says( );
};
```
- this is differential inheritance
- by customizing a new object, we specify the differences from the object on which it is based

### Functional
- one weakness of the inheritance patterns we have seen so far is that we get no privacy (all properties of an object are visible)
- fortunately, we have a much better alternative in an application of the module pattern:

    We start by making a function that will produce objects.

1. It creates a new object. There are lots of ways to make an object. It can make an object literal, or it can call a constructor function with the new prefix, or it can use the Object.create method to make a new instance from an existing object, or it can call any function that returns an object.
2. It optionally defines private instance variables and methods. These are just ordinary vars of the function.
3. It augments that new object with methods. Those methods will have privileged access to the parameters and the vars defined in the second step.
4. It returns that new object.

```
var mammal = function (spec) {
    var that = {};
    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || '';
    };
    return that;
};
var myMammal = mammal({name: 'Herb'});
```
- if all of the state of an object is private, then the object is tamper-proof
- properties of the object can be replaced or deleted, but the integrity of the object is not compromised.

## CHAPTER 6: Arrays

- JavaScript provides an object that has some array-like characteristics
- it is significantly slower than a real array, but it can be more convenient to use

### Array Literals
- an array literal is a pair of square brackets surrounding zero or more values separated by commas
- in most languages, the elements of an array are all required to be of the same type
- JavaScript allows an array to contain any mixture of values
```
var myArray = [1, 2, "three", true, {age: 2}];
```

### Length
- every array has a length property
- unlike most other languages, JavaScript’s array length is not an upper bound
- if you store an element with a subscript that is greater than or equal to the current length, the length will increase to contain the new element
- there is no array bounds error
- the length property is the largest integer property name in the array plus one
- this is not necessarily the number of properties in the array:

```
var myArray = [];
myArray.length             // 0
myArray[1000000] = true;
myArray.length             // 1000001
// myArray contains one property
```
- making the length larger does not allocate more space for the array
- making the length smaller will cause all properties with a subscript that is greater than or equal to the new length to be deleted

### Delete
- since JavaScript’s arrays are really objects, the `delet`e operator can be used to remove elements from an array:

```
delete numbers[2]; // numbers is ['zero', 'one', undefined, 'shi', 'go']
```
- unfortunately, that leaves a hole in the array
- this is because the elements to the right of the deleted element retain their original names
- what you usually want is to decrement the names of each of the elements to the right
- fortunately, JavaScript arrays have a `splice` method: the first argument is an ordinal in the array, the second argument is the number of elements to delete (any additional arguments get inserted into the array at that point)

```
numbers.splice(2, 1); // numbers is ['zero', 'one', 'shi', 'go']
```

### Enumeration
- since JavaScript’s arrays are really objects, the `for in` statement can be used to iterate over all of the properties of an array
- unfortunately, `for in` makes no guarantee about the order of the properties, and most array applications expect the elements to be produced in numerical order
- also, there is still the problem with unexpected properties being dredged up from the prototype chain
- fortunately, the conventional for statement avoids these problems

```
var i;
for (i = 0; i < myArray.length; i += 1) {
    document.writeln(myArray[i]);
}
```
### Confusion
- the `typeof` operator reports that the type of an array is 'object', which isn’t very helpful.
- JavaScript does not have a good mechanism for distinguishing between arrays and objects
- we can work around that deficiency by defining our own **is_array** function

### Methods
- JavaScript provides a set of methods for acting on arrays
- the methods are functions stored in Array.prototype
- Array.prototype can be augmented as well

### Dimensions
- JavaScript arrays usually are not initialized
- if you ask for a new array with [], it will be empty
- if you access a missing element, you will get the `undefined` value
- JavaScript does not have arrays of more than one dimension, but like most C languages, it can have arrays of arrays:

```js
var matrix = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
matrix[2][1]    // 7
```
- to make a two-dimensional array or an array of arrays, you must build the arrays yourself

## CHAPTER 7: Regular Expressions

- many of JavaScript’s features were borrowed from other languages
- the syntax came from Java, functions came from Scheme, and prototypal inheritance came from Self
- JavaScript’s Regular Expression feature was borrowed from Perl
- the methods that work with regular expressions are `regexp.exec`, `regexp.test`, `string.match`, `string.replace`, `string.search`, and `string.split`
- JavaScript’s regular expressions are difficult to read in part because they do not allow comments or whitespace
- all of the parts of a regular expression are pushed tightly together, making them almost indecipherable
- there is a very high degree of compatibility between JavaScript language processors
- the part of the language that is least portable is the implementation of regular expressions
- regular expressions that are very complicated or convoluted are more likely to have portability problems

### Construction
- there are two ways to make a RegExp object:
- the preferred way is to use a regular expression literal (enclosed in slashes)
- this can be a little tricky because slash is also used as the division operator and in comments
- the other way to make a regular expression is to use the RegExp constructor
- the constructor takes a string and compiles it into a RegExp object

```
var my_regexp1 = /"(?:\\.|[^\\\"])*"/g;
var my_regexp2 = new RegExp("\"(?:\\.|[^\\\\\\\"])*\"", 'g');
```
- the second parameter is a string specifying the flags

## APPENDIX A: Awful Parts

### Global Variables
- global variables make it harder to run independent subprograms in the same program
- if the subprograms happen to have global variables that share the same names, then they will interfere with each other and likely fail, usually in difficult to diagnose ways
- there are three ways to define global variables:
- the first is to place a var statement outside of any function:

```
var foo = value;
```
- the second is to add a property directly to the global object (the global object is the container of all global variables; in web browsers, the global object goes by the name window)

```
window.foo = value;
```
- the third is to use a variable without declaring it (this is called implied global)

```
foo = value;
```

### Scope
- JavaScript uses the block syntax, but does not provide block scope: a variable declared in a block is visible everywhere in the function containing the block
- it is better to declare all variables at the top of each function

### Semicolon Insertion
- JavaScript has a mechanism that tries to correct faulty programs by automatically inserting semicolons
- it sometimes inserts semicolons in places where they are not welcome
- if a return statement returns a value, that value expression must begin on the same line as the return:

```
return
{
    status: true
};
```
- unfortunately, semicolon insertion turns it into a statement that returns `undefined`
- the problem can be avoided if the `{` is placed at the end of the previous line and not at the beginning of the next line:

```
return {
    status: true
};
```

### Reserved Words
- most of the reserved words in Javascript are not used in the language
- they cannot be used to name variables or parameters
- when reserved words are used as keys in object literals, they must be quoted
- they cannot be used with the dot notation, so it is sometimes necessary to use the bracket notation instead

```
var method; // ok
var class; // illegal
object = {box: value}; // ok
object = {case: value}; // illegal
object = {'case': value}; // ok
object.box = value; // ok
object.case = value; // illegal
object['case'] = value; // ok
```
### Unicode
- JavaScript was designed at a time when Unicode was expected to have at most 65,536 characters
- each of the remaining million characters can be represented as a pair of characters
- Unicode considers the pair to be a single character
- JavaScript thinks the pair is two distinct characters

### typeof
- the typeof operator returns a string that identifies the type of its operand
- `typeof 98.6` produces 'number'; unfortunately: `typeof null` returns `object` instead of `null`.

### parseInt
- parseInt is a function that converts a string into an integer
- it stops when it sees a non digit, so `parseInt("16")`` and `parseInt("16 tons")` produce the same result
- if the first character of the string is 0, then the string is evaluated in base 8 instead of base 10
- in base 8, 8 and 9 are not digits, so `parseInt("08")` and `parseInt("09")` produce 0 as their result
- this error causes problems in programs that parse dates and times
- fortunately, `parseInt` can take a radix parameter, so that `parseInt("08", 10)` produces 8

### Floating Point
- binary floating-point numbers are inept at handling decimal fractions, so 0.1 + 0.2 is not equal to 0.3

### NaN
- the value NaNis a special quantity defined by IEEE 754
- it stands for ‘not a number’, even though:

```
typeof NaN === 'number'    // true
```
- the value can be produced by attempting to convert a string to a number when the string is not in the form of a number

### Phony Arrays
- JavaScript does not have real arrays
- there is no need to give them a dimension, and they never generate out-of-bounds errors
- but their performance can be considerably worse than real arrays
- the `typeof` operator does not distinguish between arrays and objects
- the arguments array is not an array; it is an object with a length member

### Falsy Values
- JavaScript has a surprisingly large set of falsy values
- they are not interchangeable
- for example, this is the wrong way to determine if an object is missing a member:

```
value = myObject[name];
if (value == null) {
    alert(name + ' not found.');
}
 ```

- `undefined` is the value of missing members, but the snippet is testing for `null`
- it is using the == operator, which does type coercion, instead of the more reliable === operator

### hasOwnProperty
- `hasOwnProperty` is a method, not an operator, so in any object it could be replaced with a different function or even a value that is not a function

### Object
- JavaScript’s objects are never truly empty because they can pick up members from the prototype chain

## APPENDIX B: Bad Parts

- == equality operator
- with Statement
- eval (more info)
- continue Statement
- switch Fall Through
- Block-less Statements
- ++ - -
- Bitwise Operators
- The function Statement Versus the function Expression
- function statements
- Typed Wrappers
- new
- void
</div>