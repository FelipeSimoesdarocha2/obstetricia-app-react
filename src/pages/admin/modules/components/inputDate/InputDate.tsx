// Models
import { InputDateProps } from './models';

// Components
import { Input } from '../input';

const InputDate = (props: InputDateProps) => {
  const { id, title, info, value, width, required, onChange } = props;

  return (
    <Input
      id={id}
      info={info}
      type="date"
      width={width}
      value={value}
      title={title}
      required={required}
      onChange={onChange}
    />
  );
}

export default InputDate;
