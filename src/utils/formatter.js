export const formatResultToString = (result) =>
  result.map((input) => input.label).join("");

export const formatName = (name, mask = "O") => {
  if (!name) return "";

  switch (name.length) {
    case 2:
      return `${name[0]}${mask}`;
    case 3:
      return `${name[0]}${mask}${name[2]}`;
    case 4:
      return `${name[0]}${name[1]}${mask}${name[3]}`;
    default:
      return "";
  }
};

export const formatMsg = ({ name, date, msg }) =>
  `${formatName(name)}${date ? date : ""}${msg}`;

export const formatData = (dataArray) => {
  return dataArray.map((data) => {
    const { id, date, name, tel, msg } = data;
    return [id, date, name, tel, formatMsg(name, date, msg)];
  });
};
