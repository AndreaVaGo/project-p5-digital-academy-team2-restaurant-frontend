import { ref, computed } from "vue";

const selectedDate = ref(null);
const selectedTime = ref(null);
const guests = ref(2);

export function useReservation() {
  const reservation = computed(() => ({
    date: selectedDate.value,
    time: selectedTime.value,
    guests: guests.value,
  }));

  const increaseGuests = () => {
    if (guests.value < 12) {
      guests.value++;
    }
  };

  const decreaseGuests = () => {
    if (guests.value > 1) {
      guests.value--;
    }
  };

  return {
    selectedDate,
    selectedTime,
    guests,
    reservation,
    increaseGuests,
    decreaseGuests,
  };
}