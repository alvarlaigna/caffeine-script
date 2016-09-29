# Programming with Caffeine

CaffeineScript makes programming more wonderful, code more beautiful and programmers more productive.

I'm making this language for me, much as Matz did with Ruby. If you agree with the philosophy behind the language, maybe it's for you too.


### What?

CaffeineScript is lean, high-level programming language that compiles to JavaScript. It is inspired by CoffeeScript, Ruby and ES6. It is close to JavaScript in semantics and close to CoffeeScript in syntax.

I owe a debt of gratitude to Jeremy Ashkenas, the author of CoffeeScript. It is my primary inspiration, and what the CaffeineScript compiler is currently written in.


### Designer language

Good design in programming, just like in Apps, should have these properties:

* beautiful
* pleasurable to use
* discoverable
* singularly focused on minimizing physical and mental effort
* less is more

I look forward to the day when there are design awards for programing langauges, editors, IDEs, compilers, debuggers, etc.

More on my design philosophy: http://www.essenceandartifact.com/2014/07/amazingly-great-design-howto.html


### Syntax Matters

I believe syntax matters. For every line of code I write, throughout the product lifecycle, will get edited at least 10 times and read it at least 100 times. Every token costs 10x - 100x more programmer-time down the road than it did to initially add it. (1)

> Code is a liability.

While the product of code is an asset - it creates value in the world, the code itself is a liability. It requires maintenence, reading, understanding, and editing. All of these things *cost* programmer time. A good way to reduce the cost of code is to reduce its size, as long as you can do so without losing clarity. When in doubt, less code is better code.

(1) These are, of course, rough numbers with no study backing them up. They are based on personal experience.

# Why CaffeineScript over JavaScript/ES6?

ES6 adds a lot of nice things to JavaScript, but didn't address JavaScript's biggest shortcoming: syntax.

```coffeescript
# CaffeineScript - 20 tokens
Framework extract createFactory render Div

HelloMessage = createFactory
  render: ->
    Div "Hello #{@props.name}"

render HelloMessage name: :Bob
```

```javascript
// ES6 - 44 tokens
var {createFactory, render, Div} = Framework;

var HelloMessage = createFactory({
  render: () => Div(`Hello ${this.props.name}`)
});

render(HelloMessage({
  name: "Bob"
}));
```

#### CaffeineScript is a Human-Language

* It dramatically reduces the number of tokens required to code.
* It ensures everything returns a value so you can program in a functional way.
* It avoids JavaScript's pitfalls:
  * JavaScript's == and != are dangroups. CafScript compiles == and != into ===, and !==.
  * JavaScript makes working with 'this' awkward and dangroups. Smart 'this' (@) bindings in CafScript (auto: ->, manualBound: =>, manualUnbound: ~>) make working with 'this' a snap.

#### JavaScript ES6 is a Machine-Language

IMO, JavaScript should be considered a machine-langauge. It is more machine-friendly than human-friendly. And that's great! Like the JVM, it's a runtime that is available on all platforms. Even better than JVM byte-codes, Javascript is vaguely human-readable. As such, it's easy to inspect the generated code and see what's going on under the CaffeineScript hood.








# CaffeineMC (Meta-Compiler)

Designed to take maximum advantage of CaffeineMC. This means the language is extensible on a per-file or per-project basis.

* Learn more about [CaffeineMC](https://github.com/shanebdavis/caffeine-mc) on github

# CaffeineScript Design

### Primary Design Goal: Minimize total effort over the entire lifecycle of a product

Programming is the ultimate lever. Programming is both a tool and a meta-tool. Improving programming has an exponetial effect on productivity. My goal is to minimize the effort (mental, physical, and time) it takes to build, test, and maintain programming products.

### Primary Design Stragies

* fun & pleasurable to use
* design for reading (we read 10x more code than we write)
* minimize tokens without sacrifcing clarity

#### Why Minimize Tokens?

Why I think this seemingly oversimplistic goal is powerful:

- Refactorability is the ONLY code quality metric
- Reducing code size is the easiest and often most effective way to improve refactorability.
- My overriding programming goal is intentionally simple: write less code.
- Most good programming practices reduce code-size. The rest increase clarity.
- I measure code size in tokens. It is an objective measure that is roughly proportional to the semantic complexity of the code - unlike line counts.
- "Without sacrificying clarity" is subjective.

#### How small or big should the language be?

With CaffeineMC, I thankfully don't have to answer this question. Everyone can choose for themselves.

# Improving CoffeeScript

CoffeeScript is my baseline. Given some of what I plan to do, I've decided it's better to start from scratch rather than fork CoffeeScript. I plan to make the base version of CaffeineScript close to CoffeeScript so it's easy to migrate. Broadly, here's what I hope to improve over CoffeeScript:

  * new, updated, refined features for cleaner, more expressive code
  * improved langauge consistency
  * keeping up with ES6

# Core Improvements

The most significant improvements over CoffeeScript.

### Block method invocation

Invoke a method by following it with a list of arguments on separate lines:

```coffeescript
# CoffeeScript
method arg1,
  arg2
  arg3
  arg4

# CaffeineScript
method
  arg1
  arg2
  arg3
  arg4

# Javascript
method(arg1, arg2, arg3, arg4);
```

### include

Currently, the first 5-20 lines of all my files is wasted extracting values from libraries. These need to be constantly updated as I use new parts from my libraries in each file. Also, they tend to accumulate junk over time; I rarely remove extracted values no longer need.

`include` solves this
```coffeescript
# CoffeeScript
{merge} = Foundation
merge b, c

# CaffeineScript
include Foundation
merge b, c

# JavaScript
var merge = Foundation.merge || global.merge;
merge(a, b);
```

```coffeescript
# CoffeeScript
Foundation = require "art-foundation"
Atomic = require "art-atomic"
React = require "art-react"

{log, capitalize} = Foundation
{point, hslColor} = Atomic
{
  createComponentFactory
  Component
  CanvasElement
  Element
  RectangleElement
  TextElement
  arrayWithout
} = React
...

# CaffeineScript
include
  require "art-foundation"
  require "art-atomic"
  require "art-react"
...

# CaffeineScript - Alt 1
# string literal args for include become 'require' statements
include
  "art-foundation"
  "art-atomic"
  "art-react"
...

# CaffeineScript - Alt 2
# ArtSuite packages all of ArtFoundation, ArtAtomic, ArtReact and others into one object
include "art-suite"
...
```

#### JavaScript's `with`

My concept of `include` is similar to JavaScript's built in `with`. I know `with` is maligned, but I think it can be rehabilitated with slightly different semantics:

* [Some arguments against `with`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
* CaffeineScript's `include` will be implemented as a load-time cost, not a runtime cost. Essentially, there should be little or no practical performance hit.
* Since you can always view the generated javascript, CaffeineScript's `include` should be easier to understand.
* `include` best practices
  * `include` should only be used at load time
  * `include` should only be used with plain objects
  * Most the bad examples in the link above are, IMO, just bad uses of `include`. As with all powerful tools, including most programming constructs, you can shoot yourself in your foot if you use it incorrectly.
* Not-future-proof is the most interesting example in the link above.
  * If use the best-practices from the previous bullet and only use `include` at the top-most level of each file to pull in values from libraries, you could still be susceptible to breakage due to language or library changes.
  * However, good code should never access globals - the values set on window/self/global - except for those defined by the EcmaScript standard.
  * Such code, using `include`, is only susceptible to breakage if the EcmaScript standard or a library *removes* a property or completely redefines it.
  * In either case, code without `include` would be just as susceptible.

### Blocks instead of Brackets

I've wasted too many months (years?!?) of my life searching for mismatched begin/end-blocks, brackets, quotes, etc. CoffeeScript's indention-based blocks help, but there are still lots of places matching delimiters are required. Let's eliminated the need for all matching delimiters and just use block indention.

strings
```coffeescript
# CoffeeScript
a = "
  This is
  my multiline
  string without newlines.
  "
b = """
  This is
  my multiline
  string with newlines.
  """
c = "To end of line string."

# CaffeineScript
a = ""
  This is
  my multiline
  string without newlines.
b = """
  This is
  my multiline
  string with newlines.
c = "" To end of line string.
```

arrays
```coffeescript
# CoffeeScript
a = [
  1
  2
  3
]

# CaffeineScript
a = []
  1
  2
  3
```

array one-liners
```coffeescript
# CoffeeScript
a = [1, 2, 3]

# CaffeineScript
a = [] 1, 2, 3
```

Object literals are still implicit, but inside other lists such as arrays, you may want to specify multiple objects on a row.
```coffeescript
# CoffeeScript - 16 tokens
a = [
  {foo: 1}
  {bar: 2}
  {baz: 3}
]

# CaffeineScript - 12 tokens
a = []
  {} foo: 1
  {} bar: 2
  {} baz: 3
```

Object-literals with two or more object-literal-properties on one line are 'one-liners'
```coffeescript
# CoffeeScript - 25 tokens
a = [
  {foo: 1, fod: 4}
  {bar: 2, bad: 4}
  {baz: 3, bud: 4}
]

# CaffeineScript - 18 tokens
a = []
  foo: 1, fod: 4
  bar: 2, bad: 4
  baz: 3, bud: 4

# CaffeineScript ALT - 17 tokens
# When a single value is expected,
# a block with 2+ statements becomes an array literal.
a =
  foo: 1, fod: 4
  bar: 2, bad: 4
  baz: 3, bud: 4

# CaffeineScript ALT - 14 tokens
# commas are optional after number and string literals
a =
  foo: 1 fod: 4
  bar: 2 bad: 4
  baz: 3 bud: 4

# Final Token comparision - almost half!
#   CaffeineScript:12 / CoffeeScript:23 = 48% less
# (ignoring the `a =`)
```


function definitions
```coffeescript
# CoffeeScript
a = (foo, bar, baz, who) ->
  # ...

# CaffeineScript
a = () foo, bar, baz, who ->
  # ...
```

### Consistent Meaning for lines starting with '.' (and other binary operators)

New rules:

* starting a line with '.' applies the '.' operator to the return result of the previous line
  * think of it as-if the previous line had ()s around the whole line
  * or, think of it as like a binary operator with the lowest precedence
* indenting and starting a line with '.' acts as-if there was no newline
  * it directly apples to the last token on the previous line
  * or, think of it as like a binary operator with the highest precedence
* PROS
  * Predictability
  * Editability - changing the order of lines has a straightforward result
  * Further reduces the needs for ()s
  * Works in more (all) places (after an if-statement for example)

Just '.'
```coffeescript
# CoffeeScript
(new MyClass)
.foo()

# CaffeineScript
new MyClass
.foo()
```

Indent and '.'
```coffeescript
# CoffeeScript
new MyClass.getSomeOtherClass()

# CaffeineScript
new MyClass
  .getSomeOtherClass()
```

both
```coffeescript
# CoffeeScript
(new MyClass.a(1).b(2))
.foo "hi"
.bar "bye"

# CaffeineScript
new MyClass
  .a 1
  .b 2
.foo "hi"
.bar "bye"
```

works after 'if' and all other kinds of statements
```coffeescript
# CoffeeScript
(if foo
  foo 1
else
  1)
.myMethod 123

# CaffeineScript
if foo
  foo 1
else
  1
.myMethod 123
```

assignment
```coffeescript
# CoffeeScript
foo = bar
.fud()

# JavaScript
foo = bar.fud();

# CaffeineScript
foo = bar
  .fud()
```

assignment the other way around
```coffeescript
# CaffeineScript
foo = bar
.fud()

# CoffeeScript
(foo = bar)
.fud()

# JavaScript
(foo = bar).fud();
```

same logic applies to all binary operators
```coffeescript
# CoffeeScript - 19 tokens
encodedBitmap ||
(file && readAsBinaryString file) ||
(sourceUrl && RestClient.get sourceUrl || defaultUrl)

# CaffeineScript - 15 tokens
encodedBitmap
|| file && readAsBinaryString file
|| sourceUrl && RestClient.get sourceUrl
  || defaultUrl
```

### Improved pattern assignment

CoffeeScript shortcomings:

* anything more than trivial [] and {} extraction generally isn't worth it
  * isn't any more token-efficient than non-pattern assignment
  * it is hard to read since data flow is going right-to-left initially and then left-to-right
* requires a lot of {} and [] matching

Object extraction
```coffeescript
# CoffeeScript - 10 tokens
{compiled:{js}} = compile()

# CoffeeScript without pattern assignment - 8 tokens
js = compile().compiled.js

# CaffeineScript - 6 tokens
compile() extract compiled extract js
```

Object extraction
```coffeescript
# CoffeeScript - 10 tokens
{Elements:{Base, Bitmap}} = Engine

# CoffeeScript alt - 12 tokens
{Elements} = Engine
{Base, Bitmap} = Elements

# CaffeineScript - 7 tokens
Engine extract Elements extract Base, Bitmap

# CaffeineScript alt - 6 tokens
Engine extract Elements extract
  Base
  Bitmap
```

Array extraction
```coffeescript
# CoffeeScript - 9 tokens
[a, b, c] = myArray

# CaffeineScript - 8 tokens
myArray extract [] a, b, c

# CaffeineScript alt - 6 tokens
myArray extract []
  a
  b
  c
```

Conditional extraction
```coffeescript
# CoffeeScript - 7 tokens
{Elements} = Engine if Engine

# CaffeineScript - 4 tokens
Engine extract? Elements
```

Nested conditional extraction
```coffeescript
# CoffeeScript - 15 tokens
{Elements:{Base, Bitmap}} = Engine if Engine?.Elements

# CaffeineScript - 9 tokens
Engine extract? Elements extract? Base, Bitmap
```

Default extraction
```coffeescript
# CoffeeScript - 21 tokens
{Elements:{Base, Bitmap}} = Engine if Engine?.Elements
Base ||= default1
Bitmap ||= default2

# Javascript - 36 tokens
var Base = (Engine && Engine.Elements && Engine.Elements.Base) || default1;
var Bitmap = (Engine && Engine.Elements && Engine.Elements.Bitmap) || default2;

# CaffeineScript - 12 tokens
Engine extract? Elements extract?
  Base = default1
  Bitmap = default2
```

Function argument extraction with defaults
```coffeescript
# CoffeeScript - 13 tokens
(options = {}) ->
  {a, b} = options

# CaffeineScript - 8 tokens
(extract? a, b) ->
```

Function argument extraction, capture unextracted argument, with full defaults
```coffeescript
# CoffeeScript - 19 tokens
(options = {}) ->
  {a, b} = options
  a ||= 1
  b ||= 2

# CaffeineScript - 14 tokens
(options = {} extract a = 1, b = 2) ->
```

Works like other binary operators
```coffeescript
# CoffeeScript - 6 tokens
{a, b} = ... # long complex expression

# CaffeineScript - 4 tokens
... # long complex expression
extract a, b
```

# Other Improvements / Refinements

### Auto 'do'
Do you ever have bugs because you forgot a "do"? I do all the time. I think defaulting to 'do' will cause less bugs.

(This needs performance testing and semantic refinement.)

```coffeescript
# CoffeeScript
for a in b
  do (a) ->
    -> a

# CaffeineScript
# for-block is an implicit closure
# If a function is created in the for-block, wrap all variables
# in a closure so each iteration gets its own copy.
# Only capture variables first-assigned in the for-block and not used outside.
for a in b
  -> a
```

### Smart '@' binding

Basically, make '->' work more consistently with other languages. Most the time we shouldn't have to think about '@' binding. Only in rare occasions should we have to override the default.

* In class definitions and not inside other explicit functions, -> works like CoffeeScript
* Inside an explicit function definitions, -> binds '@' to its enclosing scope. (like => in CoffeeScript)
* Overrides
  * ~> is always unbounded (-> in CoffeeScript)
  * => is always bounded (just like in CoffeeScript)

```coffeescript
# CoffeeScript
class Foo extends Art.Foundation.BaseObject
  @setter
    baz: (a) -> ...

  bar: (list) ->
    list.each (a) =>
      @baz = a

# CaffeineScript
class Foo extends Art.Foundation.BaseObject
  @setter
    baz: (a) -> ...

  bar: (list) ->
    list.each (a) ->
      @baz a
```

### map, each and for loops

CoffeeScript's 'for' loop is actually a 'map.' Sometimes you don't want that. This is both a performance and a semantic problem.

(I'm still debating what the keywords should be.)

```coffeescript
# CoffeeScript
# create and return new array
(list) ->
  for element in list
    element.foo

# return list; doesn't create a new array
(list) ->
  for element in list
    @add element
  list

# CaffeineScript
# create and return new array
(list) ->
  map element in list
    element.foo

# return list; doesn't create a new array
(list) ->
  each element in list
    @add element
```

### Extended unquoted labels:

```coffeescript
# CoffeeScript
foo: 1
'foo.bar': 2
'foo-bar': 3

# CaffeineScript
foo: 1
foo.bar: 2
foo-bar: 3
```

# NOTE: Counting Tokens

I'm still refining what I consider a token. Strictly, it's what the tokenizer of a parser recognizes, but depending on how you write your tokenizer, you can alter the count.

The edge cases below could be parsed by a tokenizer either way.

* 1 token: empty brackets ```{}, [], ""```
  * why: conceptually these are single entities and, when reading code, are understood as a single, simple thing
* 1 tokens: labels ```foo: 123```
  * why: removing ':' usually breaks parsing, if not, it results in radically different semantics
* 2 tokens: trailing questionmark: ```foo?```
  * why: Removing the '?' results in another legal parse with different semantics

Below are some examples where there is not controversy. There is only one way a tokenizer could parse them:

* 3 tokens: ```[1]```
