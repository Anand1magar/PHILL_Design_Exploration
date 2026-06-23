One-line: white detail surface (radius 16, hairline border + soft shadow) with an optional title row and copy action.

```jsx
<Card title="Patient Profile" onCopy={copyPatient}>
  <KeyValue label="Legal Name" value="Patricia Tuladhar" />
  <KeyValue label="DOB" value="02/18/1978" />
</Card>
```
Holds KeyValue rows, tags, alerts. Pass `action` for a custom header control.
