export {};

export const MATRIX_BASE = "https://matrix.";
export const LOGIN_ENDPOINT = "/_matrix/client/v3/login";
export const REGISTRATION_ENDPOINT = "/_matrix/client/v3/register";
export const DEV_DOMAIN = "varun.circles-dev.net";
export const DEV_HOMESERVER = MATRIX_BASE + DEV_DOMAIN;
export const DEV_REGISTRATION_URL = DEV_HOMESERVER + REGISTRATION_ENDPOINT;
export const DEV_LOGIN_URL = DEV_HOMESERVER + LOGIN_ENDPOINT;
