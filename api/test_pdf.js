require('@babel/register')({ presets: ['@babel/preset-env', '@babel/preset-react'] });
const React = require('react');
const { pdf, Document, Page, Text } = require('@react-pdf/renderer');

(async () => {
  const doc = (
    React.createElement(Document, null,
      React.createElement(Page, { size: "A4" }, React.createElement(Text, null, "Hello"))
    )
  );

  const result = pdf(doc);
  console.log('result typeof:', typeof result, 'has toBuffer:', typeof result.toBuffer);
  if (typeof result.toBuffer === 'function') {
    const buf = await result.toBuffer();
    console.log('buffer length:', buf && buf.length, 'isBuffer?', Buffer.isBuffer(buf));
  } else {
    console.log('No toBuffer function');
  }
})();
