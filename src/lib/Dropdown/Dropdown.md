This component is the commmon Dropdown component.

```js
const roles = ['ux designer', 'java developer', 'python developer'];
<Dropdown label='Roles' customHeight='150px' value='' onSelect={() => {}}>
    {roles.map(option => (
        <Dropdown.Option key={option} value={option} showButton>
            {option}
        </Dropdown.Option>
    ))}
</Dropdown>;
```
