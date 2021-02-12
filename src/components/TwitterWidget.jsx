import React from "react";

function TwitterWidget() {
  return (
    <>
      <a
        className="twitter-timeline"
        href="https://twitter.com/WHO?ref_src=twsrc%5Etfw"
      >
        Tweets by WHO
      </a>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </>
  );
}

export default TwitterWidget;
