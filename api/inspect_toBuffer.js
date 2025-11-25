require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});
const React = require("react");
const { pdf, Document, Page, Text } = require("@react-pdf/renderer");

(async () => {
  const doc = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4" },
      React.createElement(Text, null, "Hello from inspect")
    )
  );

  console.log("Calling pdf(doc).toBuffer()...");
  const result = await pdf(doc).toBuffer();
  console.log("TYPE:", typeof result);
  if (Buffer.isBuffer(result)) {
    console.log("Result is Buffer, length=", result.length);
  } else {
    console.log("Result is not Buffer. Inspecting keys...");
    console.log(Object.keys(result));
    console.log("Has _readableState:", !!result._readableState);
    if (result._readableState) {
      console.log(
        "ReadableState.buffer length:",
        Array.isArray(result._readableState.buffer)
          ? result._readableState.buffer.length
          : typeof result._readableState.buffer
      );
      if (
        Array.isArray(result._readableState.buffer) &&
        result._readableState.buffer.length > 0
      ) {
        console.log(
          "First buffer type:",
          typeof result._readableState.buffer[0],
          result._readableState.buffer[0] &&
            result._readableState.buffer[0].length
        );
      }
    }

    // try to collect as stream if possible
    if (typeof result.on === "function") {
      console.log(
        "Result is stream-like (has on). Trying to collect data by piping to array..."
      );
      const chunks = [];
      result.on("data", (c) => chunks.push(c));
      result.on("end", () => {
        try {
          const b = Buffer.concat(chunks.map((c) => Buffer.from(c)));
          console.log("Collected stream length", b.length);
          require("fs").writeFileSync(
            "/workspaces/v_plus/api/inspect_out.pdf",
            b
          );
        } catch (e) {
          console.error("Error collecting stream:", e);
        }
      });
    }
  }
})();
