import React, { useEffect, useState } from "react";

interface IPhoneMaskProps {
  number: string;
}

function PhoneText(props: IPhoneMaskProps) {
  const { number } = props;
  const [phoneMask, setPhoneMask] = useState<string>("");

  useEffect(() => {
    if (number?.length > 10) {
      setPhoneMask(
        number.replace(/^(\d\d)(\d{1})(\d{4})(\d{4}).*/, "($1) $2 $3-$4")
      );
    } else {
      setPhoneMask(number?.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3"));
    }
  }, [number]);

  return <p>{phoneMask}</p>;
}

export default PhoneText;
