import { Label } from '../ui/label';
import { Input } from '../ui/input';

function ImageInput({name,label}:{name:string,label:string}) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label}
      </Label>
      <Input id={name} name={name} type='file' required accept='image/*' />
    </div>
  );
}
export default ImageInput;

