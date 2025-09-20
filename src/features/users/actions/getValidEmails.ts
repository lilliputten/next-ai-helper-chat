'use server';

// TODO: Move to constants (and provide a way to extend from env), create a DB table with available emails and other data to detect allowed users
const validEmails = [
  // Allowed emails
  // 'dmia@yandex.ru',
  'igor@lilliputten.com',
  'lilliputten@yandex.ru',
];

export async function getValidEmails() {
  return validEmails;
}
