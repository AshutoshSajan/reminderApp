const mailMessage = userId => {
  return `
    <div style="width:500px; margin: 0 auto;">
      <h2
        style="width:500px;
        text-alighn:center;
        padding: 10px 20px;
        font-size: 30px;
        font-weight:bold"
      >Monthly Payment Reminder</h2>
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
          style="width:100px;
          padding:5px 10px;
          color:#111;
          background:#2e8dbd;
          margin: 0 auto;
          border-radius: 2px"
          href="http://localhost:3000/students/${userId}/send-payment-details"
          className="button is-info"
          id="payment-link"
          target="_blank"
        >
          Send Payment Details
        </a>
      </p>
    </div>
`;
};

module.exports = mailMessage;
