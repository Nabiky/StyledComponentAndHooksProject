This component is the commmon Checkbox component.

```jsx
import CheckBox from './Checkbox';
import Icon from '../FontIcons';
<CheckBox
    checked={state.checked}
    onClick={() => setState(prevState => ({ checked: !prevState.checked }))}
    >checkbox</CheckBox>
```