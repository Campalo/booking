import { ResourceType } from '../utils/useResource';
import "./Resource.scss";

interface Props {
  resource: ResourceType | undefined;
}

const Resource = ({resource}:Props) => {
  return (
    <header>
      <h1>{resource?.name}</h1>
      <div>
         <h2>Free</h2>
        <button onClick={() => console.log("TODO: Book")}>Book now</button>
      </div>
        <p>Book for at least {resource?.minimumBookingDuration} min and for {resource?.maximumBookingDuration} min maximum.</p>
    </header>
  )
}

export default Resource;