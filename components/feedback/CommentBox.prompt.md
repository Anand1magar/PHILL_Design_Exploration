One-line: PA Queue comment composer (rounded field + inline blue send button) and CommentItem log entries.

```jsx
<CommentBox onSend={(text) => post(text)} />
<CommentItem meta="Fri Aug 23, 2024 9:05 AM EDT · PhilSystem">
  PA created callback received from CMM. cmmKey: BY9YXEB7
</CommentItem>
```
Send button enables only when the field is non-empty. CommentBox can be controlled (`value`/`onChange`).
