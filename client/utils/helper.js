export function isValidPhoneNumber(phoneNumber) {
  const regExp = /^\d{10}$/;

  if (phoneNumber.match(regExp)) {
    return true;
  }

  return false;
}

export default function action(type, data) {
  return {
    type,
    data,
  };
}
