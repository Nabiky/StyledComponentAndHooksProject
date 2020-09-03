import React from 'react';
import Input from './Input';

const InputWithForwardRef = React.forwardRef((props, ref) => (
    <Input innerRef={ref} {...props} />
));
InputWithForwardRef.displayName = 'Input';

export default InputWithForwardRef;
