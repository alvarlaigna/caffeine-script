"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return (() => {
    let ObjectDestructuringStn;
    return (ObjectDestructuringStn = Caf.defClass(
      class ObjectDestructuringStn extends require("../BaseStn") {},
      function(ObjectDestructuringStn, classSuper, instanceSuper) {
        this.prototype.toJs = function(options) {
          let restructuring, restructuringStart, subOptions;
          if (options) {
            ({ restructuring, restructuringStart } = options);
          }
          if (restructuringStart || restructuring) {
            subOptions = { restructuring: true };
          }
          return restructuring
            ? `${Caf.toString(this.childrenToJs(", ", subOptions))}`
            : `{${Caf.toString(this.childrenToJs(", ", subOptions))}}`;
        };
      }
    ));
  })();
});
