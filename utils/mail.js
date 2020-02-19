const mailMessage = userId => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
        />
        <title>Payemnt reminder</title>
      </head>
      <body>
        <div className="container" key="{i}">
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <h2>Monthly Payment Reminder</h2>
              <p>
                This mail is to remind you about your Monthly payment. If you
                haven't made you payment then please make the payment and click the
                link below to send your payment details. If you have already made
                the payment then click on the link below to send your payment
                details. and. if you have aleady made the payment and sent the
                payment details then ignore this message. Thank you.
              </p>

              <p>
                <a
                  href="http://localhost:3000/students/${userId}/send-payment-details"
                  className="button is-info"
                  id="payment-link"
                  target="_blank"
                >
                  Send Payment Details
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = mailMessage;
