export const REGEX_PATERN = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  EMAIL_LIST:
    /^([a-zA-Z0-9][a-zA-Z0-9_*$&+,:;=?#|'<>.^*()%!-]{0}@[a-zA-Z0-9-]{2,}(.[a-zA-Z0-9-]{2,}){1}\s*?;?\s*?)+$/,
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  PHONE_NUMBER: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
};
