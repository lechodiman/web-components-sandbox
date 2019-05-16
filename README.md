# Lessons

- Styles are overwritten by light DOM

- `<slot>` only **projects** the element on the light DOM. It does NOT copy it.

* To add style based on a certain condition:

```css
:host-context(p) {
  font-weight: bold;
}
```

You can add something like `:host-context(p.important)`
