import { ref, computed } from "vue";

const selectedDate = ref(null);
const selectedTime = ref(null);
const guests = ref(2);

const name = ref("");
const phone = ref("");
const email = ref("");
const specialRequests = ref("");

const errors = ref({});

export function useReservation() {
  const reservation = computed(() => ({
    date: selectedDate.value,
    time: selectedTime.value,
    guests: guests.value,
    name: name.value,
    phone: phone.value,
    email: email.value,
    specialRequests: specialRequests.value,
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
    name,
    phone,
    email,
    specialRequests,
    reservation,
    errors,
    increaseGuests,
    decreaseGuests,
  };
}