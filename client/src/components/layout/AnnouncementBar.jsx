import Container from "../common/Container";

function AnnouncementBar() {
  return (
    <div className="bg-green-900 text-white text-sm">
      <Container>
        <div className="flex items-center justify-between py-2">

          <p>
            🚚 Free Shipping on Orders Above ₹499
          </p>

          <div className="hidden md:flex gap-6">
            <span>100% Natural</span>
            <span>No Preservatives</span>
            <span>Premium Quality</span>
          </div>

        </div>
      </Container>
    </div>
  );
}

export default AnnouncementBar;