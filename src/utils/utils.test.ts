import { BookingType } from "./useBookings";
import { ResourceType } from "./useResource";
import { getMaxEnd } from "./utils";

const getDate = (h: number, m: number) => new Date(2022, 29, 1, h, m, 0);

const resource: ResourceType = {
  name: "Room",
  maximumBookingDuration: 90,
  minimumBookingDuration: 10,
  id: "123",
  bookingDurationStep: 5,
}

const bookings : BookingType[]=  [
  {
    "id": "FUCN3hdPslM81xW-sJDmO",
    "start": getDate(6, 30),
    "end": getDate(6, 45),
    "name": "Diffusion DC Comics",
    "userId": "y8Lc5mzU4KkXIh_bmtfcX"
  },
  {
    "id": "0hsjRVDnnyxoU2hBOGSaZ",
    "start": getDate(21, 10),
    "end": getDate(21, 50),
    "name": "Pot de départ",
    "userId": "fRbY66_5Y7zkPdrjRGzyL"
  },
  {
    "id": "2kruRVDnnyxoU2hBOGSaZ",
    "start": getDate(20, 0),
    "end": getDate(21, 30),
    "name": "Meeting with HR",
    "userId": "fRbY66_5Y7zkPdrjRGzyL"
  },
];

describe("getMaxEnd", () => {
  describe("when the date is within a booking interval", () => {
    it("should return undefined", () => {
      const end = getMaxEnd(getDate(21, 30), bookings, resource);
      expect(end).toBeUndefined();
    })
  })
  describe("when the date is after all bookings intervals", () => {
    it("should return 90", () => {
      const end = getMaxEnd(getDate(22, 10), bookings, resource);
      expect(end).toBe(90);
    })
  })
  describe("when the date is less than 10 min before the next booking interval", () => {
    it("should return undefined", () => {
      const end = getMaxEnd(getDate(19, 55), bookings, resource);
      expect(end).toBeUndefined();
    })
  })
  describe("when the date is more than 90 min before the next booking interval", () => {
    it("should return 90", () => {
      const end = getMaxEnd(getDate(14, 30), bookings, resource);
      expect(end).toBe(90);
    })
  })
  describe("when the date is 30 min before the next booking interval", () => {
    it("should return 30", () => {
      const end = getMaxEnd(getDate(19, 30), bookings, resource);
      expect(end).toBe(30);
    })
  })
})