import { Container } from "../components/layout/Container";

function Theme() {
  return (
    <Container className="pt-12 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Theme</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-gray-500">Theme settings coming soon...</p>
      </div>
    </Container>
  );
}

export default Theme;
