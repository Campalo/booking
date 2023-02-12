import { useState } from "react";
import "./FormModal.scss";

export interface BookingPayload {
  name: string,
  duration: number,
}

interface FormProps {
  addBooking: (booking: BookingPayload) => void,
  intervals: number[],
}

export const FormModal = ({addBooking, intervals}: FormProps) => {
  const initialValue = {
    name: "",
    duration: intervals[0].toString(),
  }
  const [value, setValue] = useState(initialValue);

  const handleChange = ((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setValue(previousState => ({ ...previousState, [name]: value}))
  });

  const reset = () => setValue(initialValue);

  const handleSubmit = () => {
    const parsedDuration = parseInt(value.duration);
    const formattedValue: BookingPayload = {...value, duration: parsedDuration};
    addBooking(formattedValue);
    reset();
  };

  const handleCancel = () => {
    (document.getElementById("dialog") as any).close();
    reset();
  }

  return (
    <dialog id="dialog">
      <h2>Book this room</h2>
      <form onSubmit={handleSubmit} method="dialog">
        <label>
          What's the name of the meeting?
          <input type="text" name="name" value={value.name} onChange={handleChange} placeholder="Daily" autoFocus required minLength={3} maxLength={500}/>
        </label>

        <label>
          What's its duration in minutes?
          <select name="duration" value={value.duration} onChange={handleChange} required size={5}>
            {intervals.map((interval) => {
              return <option key={interval} value={interval}>{interval}</option>
            })}
          </select>
        </label>
        <p>
          <small>The maximum booking duration may vary because it depends on the starting time of the next booking, if there is one.</small>
        </p>

        <footer>
          <button type="submit" className="primary">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </footer>
      </form>
    </dialog>
  )
}