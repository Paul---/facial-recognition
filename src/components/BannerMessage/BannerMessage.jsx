import React from "react";

const BannerMessage = ({ message }) => {
  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-200-l mw6 center shadow-5">
      <h1>{message}</h1>
    </article>
  );
};

export default BannerMessage;
