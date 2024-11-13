const ContactInfo = ({ driver, coordinator }) => (
  <div>
    <h2>Contact Information</h2>
    <p>Driver: {driver.name}, Phone: {driver.mobile}</p>
    <p>Coordinator: {coordinator.name}, Email: {coordinator.email}</p>
  </div>
);

export default ContactInfo;
