import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  // console.log(error);

  return (
    <div>
      <h1 className='text-2xl py-3 font-bold'>Something went wrong 😢</h1>
      <p className=''>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
