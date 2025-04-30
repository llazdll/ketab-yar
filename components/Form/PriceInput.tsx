
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormInputNumberProps = {
  name?: string
  label?: string
  defaultValue?: number;
};

function PriceInput({ defaultValue, label, name }: FormInputNumberProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor='price' className='capitalize'>
        {label}
      </Label>
      <Input
        id={name}
        type='number'
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}
export default PriceInput;
