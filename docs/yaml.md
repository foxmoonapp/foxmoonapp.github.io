## UI Block
A UI block abstracts a ui component in real world. By splitting the whole app into smaller pieces, we can create a completely modular blocks that together shape an application.

**Sample Page UIBLock**
```yaml
kind: ui
name: Page
spec:
  view:
    container:
      layout: flex_column
      children:
        - label:
            value:
              static: this is Page block!
        - block:
            name: Header
```

- **kind**: ui
- **name**: (string) required, the name is pascal case and should only be alphebetic charachters
- **spec**: ([UISpec](#uispec))

---

## UISpec
UISpec is the specification of the desired ui component.

- **view**: ([View](#view)), required

---

## View
View is the specification for the visual elements and describes the elements hierarchy.

View can have either one of the below properties:
  - [container](#container)
  - [label](#label)
  - [block](#block)

---

## Container

A cointainer is a collection of views and is used for layouting the elements.

- **type**: container
      layout: flex_column
- **layout**: (string) required, layout can be either `flex_row` or `flex_column`.
- children: ([View[]](#view)) array of views

---

## Label
Label is the specification for the text element.

- **type**: label
- **value**: ([Value](#value))

---

## Value
Value specifies the expresion to assign to an ui element.

- **static**: (string)

---

## Block
block specification lets to include another block and enables modularization for the application.

- **type**: block
- **name**: (String) required,
  The name indicates the target ui block's name to include.

---

The compiler accepts multi document YAML string as input so it's easy to define different ui blocks and reuse them. This example demostrates a simple Header and Footer component which only has a label element and a Page ui block which reuses both Header and Footer in a flex column contianer.
```yaml
kind: ui
name: Header
spec:
  view:
    label:
      value:
        static: This is Header

---

kind: ui
name: Footer
spec:
  view:
    label:
      value:
        static: This is Footer

---

kind: ui
name: Page
spec:
  view:
    container:
      layout: flex_column
      children:
        - block:
            name : Header
        - block:
            name : Footer
```
