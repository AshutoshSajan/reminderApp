const mailMessage = (userId) => `
    <div style="width:500px; margin: 0 auto; text-align:center">
      <div>
        <h2
          style="width:500px;
          text-alighn:center;
          padding: 10px 20px;
          font-size: 30px;
          font-weight:bold"
        >
          Monthly Payment Reminder
        </h2>
        <p
          style="text-align: justify;
          padding-bottom: 20px"
        >
          This mail is to remind you about your Monthly payment. If you
          haven't made you payment then please make the payment and click the
          link below to send your payment details. If you have already made
          the payment then click on the link below to send your payment
          details. and. if you have aleady made the payment and sent the
          payment details then ignore this message. Thank you.
        </p>

        <p>
          <a
            style="width:100px;
            padding: 5px 10px;
            color: #111;
            background: #19ceac;
            margin: 0 auto;
            border-radius: 2px;
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0 4px 6px 0 rgba(0,0,0,0.3)"
            href="http://localhost:3000/students/${userId}/send-payment-details"
            className="button is-info"
            id="payment-link"
            target="_blank"
          >
            Submit Payment Details
          </a>
        </p>
      </div>
    </div>
`;

module.exports = mailMessage;
