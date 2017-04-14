"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let StandardImport = require("../StandardImport");
  return function() {
    this.rule(
      {
        destructuringAssignment: "structure:destructuringTarget _? '=' _? value:assignedValue"
      },
      { stnFactory: "DestructuringAssignmentStn" }
    );
    this.rule({
      destructuringTarget: ["objectDestructuring", "arrayDestructuring"]
    });
    this.rule(
      { objectDestructuring: "'{' _? objectDestructuringList _? '}'" },
      { stnFactory: "ObjectDestructuringStn" }
    );
    this.rule({ arrayDestructuring: "'[' _? arrayDestructuringList _? ']'" }, {
      stnFactory: "ArrayDestructuringStn"
    });
    this.rule({
      arrayDestructuringList: [
        {
          pattern: "element:arrayDestructuringElement _comma_ arrayDestructuringList"
        },
        { pattern: "element:arrayDestructuringElement" }
      ],
      arrayDestructuringElement: [
        "arrayDestructuringIdentifier",
        "destructuringTarget"
      ]
    });
    this.rule({
      objectDestructuringList: [
        {
          pattern: "element:objectDestructuringElement _comma_ objectDestructuringList"
        },
        { pattern: "element:objectDestructuringElement" }
      ],
      objectDestructuringElement: [
        "labeledDestructuringTarget",
        "destructuringIdentifier"
      ]
    });
    this.rule(
      {
        labeledDestructuringTarget: "identifier _? ':' _? arrayDestructuringElement"
      },
      { stnFactory: "LabeledDestructuringTargetStn" }
    );
    this.rule(
      {
        arrayDestructuringIdentifier: [
          { pattern: "identifier _? ellipsis" },
          { pattern: "identifier destructuringDefault:destructuringDefault?" }
        ]
      },
      {
        stnFactory: "DestructuringIdentifierStn",
        stnProps: function() {
          return { ellipsis: !!this.ellipsis };
        }
      }
    );
    this.rule(
      {
        destructuringIdentifier: "identifier destructuringDefault:destructuringDefault?"
      },
      { stnFactory: "DestructuringIdentifierStn" }
    );
    return this.rule({ destructuringDefault: "_? '=' _? expression" });
  };
});
