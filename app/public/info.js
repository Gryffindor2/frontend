import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';

export function Message({message, color, visiblity}){
    return (visiblity?
      (<Callout.Root size='1' color={color}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {message}
        </Callout.Text>
      </Callout.Root>):<></>
    );
  }
  